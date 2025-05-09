"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Send, Volume2, StopCircle, VolumeX } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for the chatbot
const MOCK_RESPONSES = [
  "I've found 5 candidates matching your criteria. Would you like me to summarize their qualifications?",
  "The job posting for Senior Developer has received 12 applications so far. The deadline is in 3 days.",
  "Based on the interview feedback, candidate Sarah Johnson scored highest in technical skills and cultural fit.",
  "I've scheduled the interview for tomorrow at 2 PM. Would you like me to send a reminder to the team?",
  "The current hiring process takes an average of 23 days from application to offer. This is 15% faster than last quarter.",
  "I've analyzed the resume and found that this candidate has 5 years of relevant experience and all the required skills.",
]

// Backend API endpoints
const API_ENDPOINTS = {
  TTS: "http://localhost:2900/api/tts",
  STT: "http://localhost:2900/api/stt/prerecorded"
}

// Types for our messages
type MessageType = "user" | "bot"

interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: Date
  audioUrl?: string // URL for the audio file (for TTS)
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      text: "Hello! I'm your HR assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isPlaying, setIsPlaying] = useState<string | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessingSpeech, setIsProcessingSpeech] = useState(false)
  const [showTtsOption, setShowTtsOption] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  // Function to handle sending a message
  const handleSendMessage = async (useTts = false) => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setShowTtsOption(false)

    try {
      let botResponse: string
      let audioUrl: string | undefined

      if (useTts) {
        try {
          // Call TTS API
          const ttsResponse = await fetch(API_ENDPOINTS.TTS, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: inputValue,
              voice: "default"
            }),
          })

          if (!ttsResponse.ok) {
            throw new Error('Failed to convert text to speech')
          }

          const ttsData = await ttsResponse.json()
          
          // Display the API response text in the chat
          botResponse = `TTS API Response: ${JSON.stringify(ttsData)}`
          
          // We won't use audio URLs since they're dummy/empty
          audioUrl = undefined
        } catch (error) {
          console.error("TTS API error:", error)
          botResponse = "I received your text-to-speech request. The API returned a response, but the audio file is not available for playback."
        }
      } else {
        // Use mock response for regular messages
        botResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)]
      }

      // Create and add bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: botResponse,
        timestamp: new Date(),
        audioUrl: audioUrl
      }

      setMessages((prev) => [...prev, botMessage])

      // We won't automatically play audio since we're not using the audio URLs
    } catch (error) {
      console.error("Error sending message:", error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Sorry, I encountered an error processing your request.",
        timestamp: new Date(),
      }
      
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  // Function to handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (showTtsOption) {
        setShowTtsOption(false)
      }
      handleSendMessage(false)
    }
  }

  // Function to handle audio playback - uses browser TTS since backend audio URLs are dummy
  const playAudio = (text: string, messageId: string) => {
    // We'll use browser's TTS instead of trying to load audio files
    handleTextToSpeech(text, messageId)
  }

  // Function to play text using browser's speech synthesis
  const handleTextToSpeech = (text: string, messageId: string) => {
    // Stop any currently playing audio
    stopAudio()
    
    // Set the current playing message
    setIsPlaying(messageId)
    
    // Create a speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // When speech ends, reset the playing state
    utterance.onend = () => {
      setIsPlaying(null)
    }
    
    // Speak the text
    window.speechSynthesis.speak(utterance)
  }

  // Function to stop audio playback
  const stopAudio = () => {
    // Cancel any speech synthesis
    window.speechSynthesis.cancel()
    
    // Stop any audio element
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    
    setIsPlaying(null)
  }

  // Function to start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        setIsRecording(false)
        setIsProcessingSpeech(true)
        
        try {
          // Create audio blob from recorded chunks
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
          
          // Create form data for API request
          const formData = new FormData()
          formData.append('audio_file', audioBlob, 'recording.wav')
          formData.append('language', 'en')
          
          // Generate a test ID for the recording
          const testId = `user_recording_${Date.now()}`
          
          // Send to Speech-to-Text API
          const sttResponse = await fetch(`${API_ENDPOINTS.STT}/${testId}`, {
            method: 'POST',
            body: formData
          })
          
          if (!sttResponse.ok) {
            throw new Error('Failed to convert speech to text')
          }
          
          const sttData = await sttResponse.json()
          
          // Display the full API response
          const userMessage: Message = {
            id: Date.now().toString(),
            type: "user",
            text: "Voice recording submitted",
            timestamp: new Date()
          }
          
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: "bot",
            text: `STT API Response: ${JSON.stringify(sttData)}`,
            timestamp: new Date()
          }
          
          setMessages(prev => [...prev, userMessage, botMessage])
          
          // If transcript is available, put it in the input field for further editing
          if (sttData.transcript) {
            setInputValue(sttData.transcript)
          }
        } catch (error) {
          console.error("Error processing speech:", error)
          setInputValue("")
        } finally {
          setIsProcessingSpeech(false)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  // Function to stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      
      // Stop all tracks in the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <div className="flex h-full flex-col">
      <Card className="flex h-full flex-col">
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className="flex max-w-[80%] items-start gap-3">
                  {message.type === "bot" && (
                    <Avatar className="mt-1">
                      <AvatarImage src="/abstract-ai-network.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      {message.text}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}

                      {message.type === "bot" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            if (isPlaying === message.id) {
                              stopAudio()
                            } else {
                              // Always use browser TTS since audio URLs are dummy
                              handleTextToSpeech(message.text, message.id)
                            }
                          }}
                        >
                          {isPlaying === message.id ? (
                            <VolumeX className="h-4 w-4 text-primary" />
                          ) : (
                            <Volume2 className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {message.type === "user" && (
                    <Avatar className="mt-1">
                      <AvatarImage src="/abstract-geometric-shapes.png" alt="User" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="shrink-0"
                      onClick={isRecording ? stopRecording : startRecording}
                      disabled={isProcessingSpeech}
                    >
                      {isRecording ? (
                        <StopCircle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Mic className={`h-5 w-5 ${isProcessingSpeech ? "animate-pulse text-amber-500" : ""}`} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isRecording ? "Stop recording" : isProcessingSpeech ? "Processing speech..." : "Record voice"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  setShowTtsOption(e.target.value.trim().length > 0)
                }}
                onKeyDown={handleKeyPress}
                className="flex-1"
              />
              
              <Button 
                size="icon" 
                className="shrink-0" 
                onClick={() => handleSendMessage(false)}
                disabled={!inputValue.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            
            {showTtsOption && (
              <div className="ml-auto">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(true)}
                  className="text-xs"
                >
                  <Volume2 className="mr-2 h-4 w-4" />
                  Convert to speech
                </Button>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}