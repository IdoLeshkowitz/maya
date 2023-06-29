// import {FC, useState} from "react";
// import {CommonButton} from "@components/button";
// import Header from "@components/header";
// import {TaskPayload} from "@services/task";
// import {useRouter} from "next/navigation";
// import {SnapshotPayload} from "@services/snapshot";
// import {Board} from "@components/board";
//
// enum SnapshotStep {
//     IDLE,
//     LOADER,
//     SNAPSHOT,
// }
//
// interface PreviewsProps {
//     task: TaskPayload
//     nextHref: string
//     snapshot: SnapshotPayload
// }
//
// const Preview: FC<PreviewsProps> = (props) => {
//     const [step, setStep] = useState(SnapshotStep.IDLE)
//     const router = useRouter()
//     return (
//         <>
//             {/*board*/}
//             <Board
//                 rightOptionGroupsNames={props.task.rightOptionGroupsNames!}
//                 leftOptionGroupsNames={props.task.leftOptionGroupsNames!}
//                 rightOptionColor={props.task.rightOptionColor!}
//                 leftOptionColor={props.task.leftOptionColor!}
//                 rightOptionName={props.task.rightOptionLabel!}
//                 leftOptionName={props.task.leftOptionLabel!}
//                 currentSnapshot={props.snapshot}
//                 header={<Header centered={true}>{props.snapshot.label}</Header>}
//                 footer={
//                     step === SnapshotStep.IDLE &&
//                     <div className="flex items-center justify-center">
//                         <CommonButton
//                             onClick={() => {
//                                 /* show loader for 1s */
//                                 setStep(SnapshotStep.LOADER)
//                                 router.prefetch(props.nextHref)
//                                 /* then show snapshot for another sec */
//                                 setTimeout(() => {
//                                     setStep(SnapshotStep.SNAPSHOT)
//                                 }, 500)
//                                 /* then go to next step */
//                                 setTimeout(() => {
//                                     setTimeout(() => {
//                                         router.push(props.nextHref)
//                                     }, 1)
//                                     setStep(SnapshotStep.IDLE)
//                                 }, 1000)
//                             }}
//                         >
//                             Next
//                         </CommonButton>
//                     </div>
//                 }
//             />
//         </>
//     )
//
// }
// export default Preview
