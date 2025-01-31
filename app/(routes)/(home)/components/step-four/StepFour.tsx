import Image from "next/image"
import { StepFourData } from "./StepFour.data"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStepConfig } from "@/hooks/use-step-config";
import { UploadButton } from "@/lib/uploadthing";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export const StepFour = () => {
    const { setInfoUser, infoUser, nextStep, step, prevStep } = useStepConfig()
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [showUploadPhoto, setShowUploadPhoto] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState('');

    const handleImageSelect = (src: string) => {
        setSelectedPhoto(src);
        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            avatarUrl: src,
        }))
    }

    const handleContinue = async () => {

        if (!name || !username) {
            alert('Please, fill all the fields and the image');
            return;
        }

        setInfoUser((prevInfoUser) => ({
            ...prevInfoUser,
            name,
            username
        }))

        try {
            const response = await axios.post('/api/user', {
                name,
                username,
                avatarUrl: infoUser.avatarUrl,
                links: infoUser.platforms,
                typeUser: infoUser.typeUser
            })

            if (response.status === 200) {
                nextStep()
            }
        } catch (error) {
            toast({
                title: 'This user already exists 🚫',
            })
            console.error(error);
        }
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold text-neutral-950">Add profile details</h2>
            <p className="textt-sm text-neutral-600">Select your profile image or upload a new one.</p>

            <div className="grid grid-cols-3 gap-4 mt-4 items-center md:grid-cols-5">
                {StepFourData.map(({ src }) => (
                    <div key={src}
                        className={`flex flex-col items-center gap-2 p-1 cursor-pointer`}
                        onClick={() => handleImageSelect(src)}
                    >
                        <Image src={src} alt="profile" width={120} height={120} className={`w-full h-full max-w-16 object-cover rounded-full border-2 ${selectedPhoto === src ? 'border-neutral-950' : 'border-transparent'}`} />
                    </div>
                ))}

                {photoUrl && (
                    <div className={`w-full h-full flex flex-col items-center gap-2 p-1 cursor-pointer`}
                        onClick={() => handleImageSelect(photoUrl)}
                    >
                        <Image
                            src={photoUrl}
                            alt="profile image"
                            width={120}
                            height={120}
                            className={`w-full h-full max-w-16 object-cover rounded-full border-2 ${selectedPhoto === photoUrl ? 'border-neutral-950' : 'border-transparent'}`}
                        />

                    </div>
                )}

                {showUploadPhoto ? (
                    <UploadButton
                        className="max-w-16 size-16 text-[10px] rounded-full text-neutral-950 mt-4 border border-neutral-300 bg-neutral-100"
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                            setPhotoUrl(res[0].url)
                            setShowUploadPhoto(false)
                        }}
                        onUploadError={(error) => {
                            console.error('Upload failed:', error);
                        }}
                    />
                ) : (
                    <div className="max-w-16 size-16 m-auto flex flex-col items-center justify-center rounded-full border cursor-pointer" onClick={() => setShowUploadPhoto(!showUploadPhoto)}>
                        <Plus className="size-7 rotate-45 hover:text-red-500 transition-colors" />
                    </div>
                )}
            </div>


            <div className="mt-6">
                <p className="textt-sm text-neutral-600 mb-2">Complete the fields:</p>
                <div className="grid gap-3">
                    <Input
                        placeholder="Name"
                        className="w-full text-neutral-900"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Username"
                        className="w-full text-neutral-900"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-neutral-950">
                {step > 1 && step <= 5 && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={prevStep}>
                        <ArrowLeft />
                        Back
                    </Button>
                )}
                <Button onClick={handleContinue} className="w-full">Continue</Button>
            </div>
        </div>
    )
}