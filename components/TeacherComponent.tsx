'use client';
import { useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/waves2.json';
import { vapi } from "@/lib/vapi.sdk"
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import { addToSessionHistory } from "@/lib/actions/teacher.actions";
import { createLesson } from "@/lib/actions/lesson.actions";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

const TeacherComponent = ({ teacherId, subject, topic, name, userName, userImage, style, voice }: TeacherComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const messagesRef = useRef<SavedMessage[]>([]);
    
    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) lottieRef.current?.play();
            else lottieRef.current?.stop();
        }
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => {
                    const updatedMessages = [newMessage, ...prev];
                    messagesRef.current = updatedMessages; // Keep ref in sync
                    return updatedMessages;
                });
            }
            console.log(message);
        }
        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED)
            addToSessionHistory(teacherId);
            // Use the ref to get the current messages
            createLesson({
                teacherId: teacherId,
                subject: subject,
                topic: topic,
                teacherName: name,
                messages: messagesRef.current,
            });
        };
        const onError = (error: Error) => console.log('Error', error);
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd)

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        vapi.stop();
    }

    const handleConnect = async () => {
        setCallStatus(CallStatus.CONNECTING);

        const assistantOverrides = {
            variableValues: {
                subject, topic, style
            },
            clientMessages: ['transcript'],
            serverMessages: [],
        }

        // @ts-expect-error 
        vapi.start(configureAssistant(voice, style), assistantOverrides);
    }

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted);
    }
    
    return (
        <section className="flex flex-col h-[70vh]">
            <section className="flex gap-8 max-sm:flex-col">
                <div className="companion-section">
                    <div 
                        className="companion-avatar"
                        style={{ backgroundColor: getSubjectColor(subject)}}
                    >
                        <div 
                            className={
                                cn('absolute transition-opacity duration-1000',
                                    callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                                    callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                                )}>
                                <Image 
                                    src={`/icons/${subject}.svg`}
                                    alt={subject}
                                    width={80}
                                    height={80}
                                    className="max-sm:w-fit"/>
                        </div>
                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0')}>
                            <Lottie 
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    <p className="font-bold text-xl">{name}</p>
                </div>
                
                <div className="user-section">
                    <div className="user-avatar">
                        <Image src={userImage} alt={userName || 'user'} width={130} height={130} className="rounded-lg"/>
                        <p className="text-xl font-bold">{userName}</p>
                    </div>
                    <button className="btn-mic" onClick={toggleMicrophone} disabled={callStatus !== CallStatus.ACTIVE}>
                        <Image src={isMuted? '/icons/mic-off.svg' : '/icons/mic-on.svg'} alt='mic' width={28} height={28} className="disabled:opacity-30"/>
                        <p className="max-sm:hidden disabled:opacity-30">
                            {isMuted ? 'Turn on your mic' : 'Turn off your mic'}
                        </p>
                    </button>
                    <button 
                        className={cn(
                            'rounded-lg cursor-pointer py-2 transition-colors w-full text-white btn-primary', 
                            callStatus === CallStatus.ACTIVE ? 'bg-red-700 !important': '', 
                            callStatus === CallStatus.CONNECTING && 'animate-pulse')}
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleConnect}>
                        { callStatus === CallStatus.ACTIVE ? 'End Session' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Start Session'}
                    </button>
                </div>
            </section>
            <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-s text-md">
                                    Tutor: {message.content}
                                </p>
                            )
                        } else {
                            return (
                                <p key={index} className="text-primary max-sm:text-sm text-md">
                                    {userName}: {message.content}
                                </p>
                            )
                        }
                    })}
                </div>
                <div className="transcript-fade"/>
            </section>
        </section>
    )
}

export default TeacherComponent;