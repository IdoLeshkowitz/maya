'use client'
import {Dna} from "react-loader-spinner";

export default function Loader() {
    return (
        <div className="min-h-screen bg-white text-white justify-center items-center flex">
            <Dna
                visible={true}
                height="300"
                width="300"
                ariaLabel="dna-loading"
                wrapperClass="dna-wrapper"
            />
        </div>
    )
}