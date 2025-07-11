'use client';
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { addBookmark, isBookmarked, removeBookmark } from "@/lib/actions/teacher.actions";
import { Skeleton } from "@/components/ui/skeleton"

interface TeacherCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const TeacherCard = ({id, name, topic, subject, duration, color}: TeacherCardProps) => {
    const [bookmarked, setBookmarked] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkBookmark = async () => {
            try {
                const state = await isBookmarked(id);
                setBookmarked(state);
            } catch (error) {
                console.error('Failed to check bookmark status:', error);
            } finally {
                setLoading(false);
            }
        }
        checkBookmark();
    }, [id]);

    const handleBookmark = async () => {
        try {
            if (bookmarked) {
                await removeBookmark(id);
            } else {
                await addBookmark(id);
            }
            setBookmarked(!bookmarked);
        } catch (error) {
            console.error('Failed to update bookmark:', error);
        }
    }

    if (loading) {
        return (
            <article className="companion-card">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-20 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full rounded mt-6" />
                <Skeleton className="h-5 w-3/4 rounded mt-3" />
                <div className="flex items-center gap-3 mt-3">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                </div>
                <Skeleton className="h-12 w-full rounded-xl mt-6" />
            </article>
        )
    }
    return (
        <article className="companion-card group">
            <div className="flex justify-between items-center">
                <div 
                    className="subject-badge" 
                    style={{background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`}}
                >
                    {subject}
                </div>
                <button 
                    className="companion-bookmark hover:scale-110" 
                    onClick={handleBookmark} 
                    style={{background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`}}
                >
                    {bookmarked? (
                        <Image src="/icons/bookmark-filled.svg" alt="bookmark-filled" width={14} height={18} />
                    ) : (
                        <Image src="/icons/bookmark.svg" alt="bookmark" width={14} height={18} />
                    )}
                </button>
            </div>

            <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-800 group-hover:text-gray-900 transition-colors">{name}</h2>
                <p className="text-sm text-gray-600 leading-relaxed">{topic}</p>
            </div>
            
            <div className="flex items-center gap-3 text-gray-500">
                <Image src="/icons/clock.svg" alt="clock" width={16} height={16} className="opacity-70" />
                <p className="text-sm font-medium">{duration} minutes</p>
            </div>

            <Link href={`/teachers/${id}`} className="w-full">
                <button 
                    className="btn-primary w-full justify-center group-hover:scale-[1.02]" 
                    style={{background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`}}
                >
                    Launch Session
                </button>
            </Link>
        </article>
    )
}

export default TeacherCard