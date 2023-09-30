'use client';
import {object, ObjectSchema} from 'yup';
import {useFormik} from "formik";
import Slider from "@components/slider";
import {FC, useMemo, useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import {CommonButton} from "@components/button";
import Image from "next/image";
import {Prisma} from ".prisma/client";
import {useParams, useRouter} from "next/navigation";
import {personalDetailsPages, Question} from "@/app/personalDetails/personalDetails.data";
import Loader from "@components/experimentSteps/loader";

async function setPerosnalDetails(body: Prisma.UserDetailsCreateWithoutSessionInput) {
    const res = await fetch("/api/personalDetails", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.json()
}

interface QuestionsProps {
    questions: Question[]
    isLast: boolean
}

export default function Questions(props: QuestionsProps) {
    const router = useRouter()
    const [submitting, setSubmitting] = useState(false)
    const validationSchema: ObjectSchema<any> = useMemo(() =>
            object().shape(
                props.questions!.reduce((acc, question) => {
                    console.log(question.validation)
                    acc[question.id] = question.validation
                    return acc
                }, {} as any)
            )
        , [props.questions])
    const initialValues = useMemo(() =>
            personalDetailsPages.reduce((acc, page) => {
                if (page.questions) {
                    page.questions.forEach(question => {
                        acc[question.id] = undefined
                    })
                }
                return acc
            }, {} as any)
        , [])

    const {slug}: { slug: string } = useParams()

    const formik = useFormik({
        validationSchema,
        initialValues,
        onSubmit: async (values) => {
            setSubmitting(true)
            try {
                const res = await setPerosnalDetails(values)
                if (props.isLast) {
                    router.push("/finish")
                } else {
                    router.push(`/personalDetails/${parseInt(slug) + 1}`)
                }
            } catch (e: any) {
                console.log(e)
                throw new Error(e)
            }
        },
    })
    if (submitting) return <Loader/>
    return (
        <form className="text-black flex flex-col gap-4 mx-6">
            {props.questions?.map((question, index) => {
                return (
                    <FormGroup key={index}>
                        <label htmlFor={question.id}
                               className="mb-2 text-lg text-gray-900 whitespace-pre-wrap border border-transparent border-b-black w-full pb-2">{question.label}</label>
                        {
                            question.type === 'checkbox' &&
                            <div className="ps-8">
                                {question.options!.map((option, index) => {
                                    return (
                                        <div key={`${question.id}-${option}-${index}`}
                                             className="flex gap-2 items-center ms-1">
                                            <input
                                                id={`${question.id}-${option}`}
                                                type="checkbox"
                                                onChange={formik.handleChange}
                                                value={option}
                                                checked={(formik.values[question.id as keyof typeof formik.values] ?? [] as any[]).includes(option)}
                                                name={question.id}
                                                className="border-black border-opacity-30 border rounded-md w-3 h-3"
                                            />
                                            <label htmlFor={`${question.id}-${option}`}
                                                   className="mb-0.5 text-gray-700">{option}</label>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        }
                        {
                            question.type === 'text' &&
                            <input
                                id={question.id}
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values[question.id as keyof typeof formik.values] ?? ""}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 max-w-sm ms-8"
                            />
                        }
                        {
                            question.type === 'radio' &&
                            <>
                                {question.img &&
                                    <Image src={question.img.src} alt="picture" width={800} height={400}
                                           className="self-center"/>}
                                <div className="ps-8">
                                    {question.options!.map((option, index) => {
                                        return (
                                            <div key={`${question.id}-${option}-${index}`}
                                                 className="flex gap-2 items-center ms-1">
                                                <input
                                                    id={`${question.id}-${option}`}
                                                    type="radio"
                                                    onChange={formik.handleChange}
                                                    value={option}
                                                    name={question.id}
                                                    checked={formik.values[question.id as keyof typeof formik.values] === option}
                                                    className="border-black border-opacity-30 border rounded-md w-3 h-3"
                                                />
                                                <label htmlFor={`${question.id}-${option}`}
                                                       className="mb-0.5 text-gray-700">{option}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                        {
                            question.type === 'slider' &&
                            <div className="w-full pt-4">
                                <div className="flex justify-between px-5">
                                    {/* left label */}
                                    <div className="flex flex-col items-center gap-2 ps-4">
                                        <label htmlFor={question.id}>{question.labels[0]}</label>
                                        <ArrowLeftIcon className="w-5 h-5 text-gray-700 self-start"/>
                                    </div>
                                    {/* right label */}
                                    <div className="flex flex-col items-center gap-2 pe-4">
                                        <label htmlFor={question.id}>{question.labels![1]}</label>
                                        <ArrowRightIcon className="w-5 h-5 text-gray-700 self-end"/>
                                    </div>
                                </div>
                                <Slider
                                    onChange={value => formik.setFieldValue(question.id, value)}
                                    value={formik.values[question.id as keyof typeof formik.values] ? parseInt(formik.values[question.id as keyof typeof formik.values]!) : null}
                                    min={0}
                                    max={100}
                                />
                            </div>
                        }
                        {
                            question.type === 'textArea' &&
                            <textarea
                                id={question.id}
                                onChange={formik.handleChange}
                                value={formik.values[question.id as keyof typeof formik.values] ?? ""}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 max-w-xl basis-20 ms-8"
                            />
                        }
                        {
                            formik.errors[question.id as any] && formik.touched[question.id as any] ? (
                                <span
                                    className="text-red-500 text-md">{`${formik.errors[question.id as any]}`}</span>
                            ) : null
                        }
                    </FormGroup>
                )
            })}
            <div className="flex justify-center py-10 gap-6">
                <CommonButton onClick={formik.handleSubmit}>
                    Submit
                </CommonButton>
            </div>
        </form>
    )
}


interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const FormGroup: FC<FormGroupProps> = ({children, ...props}) => {
    const className = `flex flex-col text-black justify-center rounded-lg py-6 px-[13vw] gap-6 ${props.className}`
    return (
        <div {...props} className={className}>
            {children}
        </div>
    )
}