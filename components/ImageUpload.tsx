import { updateDoc } from 'firebase/firestore';
import { uploadString } from 'firebase/storage';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { MdOutlineArrowBack } from 'react-icons/md';

type Props = {
    setEditorOpen: Dispatch<SetStateAction<boolean>>;
    setCaptionModalOpen: Dispatch<SetStateAction<boolean>>;
    setOpenModal: Dispatch<SetStateAction<boolean>>;
    setFileSelectOpen: Dispatch<SetStateAction<boolean>>;
    editedFile: any;
    selectedFile: any
}

const ImageUpload = ({ setEditorOpen, setCaptionModalOpen, setOpenModal, editedFile, selectedFile }: Props) => {
    const [caption, setCaption] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const spaceRef = useRef(0);

    const {data: session}: any = useSession();

    const uploadPost = async () => {
        if(loading) return;
        setLoading(true);
         
        // upload data to firestore, doc ID will be auto-generated
        // const docRef = await addDoc(collection(db, 'posts'), {
        //     username: session?.user.username,
        //     caption: captionRef.current.value,
        //     profileImg: session?.user.image,
        //     timeStamp: serverTimestamp(),
        // });

        // // upload image/videos to firebase storage and update the document
        // const imageRef = ref(storage, `posts/image/${docRef.id}`);

        // await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        //     const downloadURL = await getDownloadURL(imageRef);
        //     await updateDoc(doc(db, 'posts', docRef.id), {
        //         image: downloadURL,
        //     })
        // });

        //setOpen(false);
        setOpenModal(false);
        setLoading(false);
    }


    // allow only single space between characters
    const updateCaption = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let lastChar = e.target.value.charAt(e.target.value.length - 1);

        if(lastChar === ' ') {
            if(caption?.charAt(caption.length - 1) === '.') {
                spaceRef.current = 0;
            }
            if(spaceRef.current === 1) {
                setCaption(e.target.value.slice(0, -1));
                e.target.value = e.target.value.slice(0, -1);
            }else {
                spaceRef.current = 1;
                setCaption(e.target.value);
            }
        }else {
            if(spaceRef.current === 1) {
                spaceRef.current = 0;
            }
            setCaption(e.target.value);
        }
    }

    return (
        <>
            <header className="p-5 flex justify-between items-center border-b border-solid border-b-gray-200">
                <button onClick={() => {setEditorOpen(true); setCaptionModalOpen(false);}}>
                        <MdOutlineArrowBack size={24}/>
                </button>
                <h1 className="text-lg font-bold">Create new post</h1>
                <button type="button" className="text-instaBlue font-bold mr-2
                        disabled:text-gray-300 disabled:cursor-not-allowed"
                        onClick={uploadPost} disabled={!caption?.trim()}>
                        {loading ? 'Uploading...' : 'Upload post'}
                </button>
            </header>
            <div className="flex flex-col md:flex-row">
                {/* edited image */}
                <section>
                    <img src={editedFile ?? selectedFile} className="max-h-[400px] mx-auto" alt="edited post image" />
                </section>
                {/* caption */}
                <section className="px-8 pt-8 md:pr-0 md:pb-8 min-w-[250px] flex flex-col justify-center">
                    <div>
                        <img 
                            src={session?.user?.image as string} 
                            alt="logged in user image" 
                            className="mx-auto w-10 rounded-full p-[1px] border border-solid border-gray-300 mb-2"/>
                        <p className="text-center font-bold">{session?.user?.username}</p>
                    </div>
                    <div className="mt-4 pr-3">
                        <textarea
                            className='border-none focus:ring-0 w-full text-center bg-blue-50 rounded-xl resize-none' 
                            placeholder='Please enter a caption...' 
                            onChange={(e) => updateCaption(e)}
                            rows={5}
                            maxLength={1000}
                        />
                        <div className="text-center text-xs text-gray-400 mb-5">{caption ? caption.length : 0}/1000</div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default ImageUpload

