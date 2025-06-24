import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface TeacherCardProps {
    id: string;
    name: string;
    topic: string;
    subject: string;
    duration: number;
    color: string;
}

const TeacherCard = ({id, name, topic, subject, duration, color}: TeacherCardProps) => {
    return (
        <article className="companion-card" style={{backgroundColor: color}}>
            <div className="flex justify-between items-center">
                <div className="subject-badge">{subject}</div>
                <button className="companion-bookmark">
                    <Image src="/icons/bookmark.svg" alt="bookmark" width={12} height={16} />
                </button>
            </div>

            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-sm text-gray-800">{topic}</p>
            <div className="flex items-center gap-2">
                <Image src="/icons/clock.svg" alt="clock" width={13} height={13} />
                <p className="text-sm text-gray-800">{duration} minutes</p>

            </div>

            <Link href={`/teachers/${id}`} className="w-full">
                <button className="btn-primary w-full justify-center">
                    Launch Session
                </button>
            </Link>
        </article>
    )
}

export default TeacherCard