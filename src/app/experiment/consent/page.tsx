import CommonLayout from "@components/commonLayout";
import Header from "@components/header";
import {cookies} from "next/headers";
import {prisma} from "@client";
import {ConsentForm} from "@/app/experiment/consent/consentForm";

export default function Consent() {

    async function setConsent(didConsent: boolean) {
        'use server'
        const prolificId = cookies().get('prolificId')?.value
        try {

            return await prisma.experimentSession.update({
                where: {
                    prolificId
                },
                data : {
                    consent: didConsent
                }
            })
        } catch (e) {
            console.error(e)
            return Promise.reject(e)
        }
    }

    // prisma.app.update({
    //     where: {
    //         appName_experimentSessionId: {
    //             appName            : "experiment",
    //             experimentSessionId: cookies().get("experimentSessionId")?.value!
    //         }
    //     },
    //     data : {
    //         children   : {
    //             connectOrCreate: {
    //                 where : {
    //                     appName_experimentSessionId: {
    //                         appName            : "consent",
    //                         experimentSessionId: cookies().get("experimentSessionId")?.value!
    //                     }
    //                 },
    //                 create: {
    //                     appName            : "consent",
    //                     experimentSessionId: cookies().get("experimentSessionId")?.value!
    //                 },
    //             }
    //         },
    //         activeChild: "consent"
    //     }
    // }).catch(e => console.error(e))
    //

    return (
        <CommonLayout
            header={<Header centered={true}>Informed Consent</Header>}
            footer={<ConsentForm onConsent={setConsent}/>}
        >
            <div className="overflow-scroll border-black border p-5 rounded whitespace-pre-wrap px-10 mx-10">
                <div className="flex flex-col gap-10">
                    <p className="text-black text-md">
                        You are invited to participate in a web-based online survey on human perception.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Benefits<br/></span>
                        Although this study will not benefit you personally, we hope that our results will add to
                        the
                        knowledge about human behaviour.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Risks<br/></span>
                        There are no foreseeable risks involved in participating in this study other than those
                        encountered in day-to-day life.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Confidentiality<br/></span>
                        Only the researchers involved in this study will have access to the information you provide.
                        The
                        researcher will not know your name, and no identifying information will be connected to your
                        survey answers in any way. The survey is therefore anonymous. However, your account is
                        associated with a Prolific number that the researcher has in order to pay you. For this
                        reason,
                        the fact of your participation in the research is technically considered “confidential”
                        rather
                        than truly anonymous.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Participation<br/></span>
                        Participation in this study is completely voluntary. You are free to decline to participate
                        and
                        to end participation at any time for any reason.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Contact<br/></span>
                        If you have questions at any time about the study or the procedures, you may contact me or
                        my
                        research supervisor, Professor Ran Hassin via email at greenlab.huji@gmail.com.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Electronic Consent<br/></span>
                        Please select your choice below. Clicking on the “Agree” button indicates that
                    </p>
                    <p className="text-black text-md ">
                        {`* You have read the above information\n* You voluntarily agree to participate\n* You are 18 years of age or older`}
                    </p>
                    <p className="text-black text-md">
                        If you do not want to participate please close the window. Your data will not be used either
                        way.
                    </p>
                </div>
            </div>
        </CommonLayout>
    )
}