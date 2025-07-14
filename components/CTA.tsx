import Image from "next/image"
import Link from "next/link"

const CTA = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way</div>
            <div className="flex flex-col gap-2 items-center">
            <h2 className="text-2xl font-bold text-white mb-2">
                Build and Personalize AI Tutors
            </h2>
            <p className="text-white/90 leading-relaxed max-w-sm">Pick a name, subject, voice, & personality. Start learning through voice conversations that feel natural and fun.</p>
            </div>
            
            <div className="my-4">
                <Image src="/images/cta-2.svg" alt="cta" width={360} height={230} />
            </div>
            <Link href="/teachers/new" className="w-full">
                <button className="btn-primary text-white w-full justify-center">
                    <Image src="/icons/plus.svg" alt="plus" width={16} height={16} />
                    <span>Create New Tutor</span>
                </button>
            </Link>
        </section>
    )
}

export default CTA