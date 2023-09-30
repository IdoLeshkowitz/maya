"use client"
import Header from "@components/header";
import Questions from "@/app/personalDetails/questions";
import prisma from "../../../../prisma/client";
import {personalDetailsPages} from "@/app/personalDetails/personalDetails.data";

interface PersonalDetailsPageProps {
    params: {
        slug: string
    }
}

// async function updatePersonalDetailsPage(page: string, prolificId: string) {
//     return prisma.experimentSession.update({
//         where: {
//             prolificId: prolificId
//         },
//         data: {
//             activePersonalDetailsPage: page
//         }
//     })
// }

export default async function PersonalDetails(props: PersonalDetailsPageProps) {
    const data = personalDetailsPages[parseInt(props.params.slug ?? "0")]
    const isLast = parseInt(props.params.slug ?? "0") === personalDetailsPages.length - 1
    return (
        <div
            className="flex flex-col bg-white gap-4 min-h-screen justify-stretch py-20 px-10"
        >
            <Header className="text-xl text-gray-700 h-min px-5 py-6">
                {data.title && data.title}
            </Header>
            {data.questions && <Questions questions={data.questions} isLast={isLast}/>}
        </div>
    )
}