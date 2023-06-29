import CommonLayout from "@components/commonLayout";
import {cookies} from "next/headers";
import {CommonLink} from "@components/button";
import {prisma} from "@client";


export default function Welcome() {
    prisma.app.update({
        where: {
            appName_experimentSessionId: {
                appName            : "experiment",
                experimentSessionId: cookies().get("experimentSessionId")?.value!
            }
        },
        data : {
            children   : {
                upsert: {
                    where : {
                        appName_experimentSessionId: {
                            appName            : "welcome",
                            experimentSessionId: cookies().get("experimentSessionId")?.value!
                        }
                    },
                    update: {
                        appName            : "welcome",
                        experimentSessionId: cookies().get("experimentSessionId")?.value!
                    },
                    create: {
                        appName            : "welcome",
                        experimentSessionId: cookies().get("experimentSessionId")?.value!
                    }
                }
            },
            activeChild: "welcome"
        }
    }).catch(e => console.error(e))


    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonLink href="/experiment/consent">Start</CommonLink>
                </div>
            }
        >
            <h1 className="flex justify-center items-center text-base font-bold text-center text-black">
                Welcome to the experiment!
            </h1>

        </CommonLayout>
    )
}