'use client';
import {array, number, object, string} from 'yup';
import {useFormik} from "formik";
import Slider from "@components/slider";
import {FC, useRef, useState} from "react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import {CommonButton} from "@components/button";
import Image from "next/image";
import Header from "@components/header";
import {Prisma} from ".prisma/client";
import {useRouter} from "next/navigation";
/*
the form includes the inputs :
age : text
gender : Radio button [woman, man, non-binary, prefer not to say]
education : Radio button [No high school diploma, High school degree or equivalent, Some college - no degree, College degree (BA/BS/AA/AS), Professional degree/Doctorate (MD/MS/PhD)]
howDecided : text area
attention : Slider [1-10]
didCount : Radio button [Yes, No]
didWrite : Radio button [Yes, No]
familiarityWithStocks : Slider [1-100]
whatIsStock : text area
whatIsPortfolio : text area
didParticipateBefore : Radio button [Yes, No]
didCheckMarkAppeared : Radio button [Yes, No]
comments : text area (optional)
 */
type Question =
    {
        id: string
        label: string
        type: "text",
    } |
    {
        id: string
        label: string
        type: "radio",
        options: string[]
        img?: {
            src: string
            alt: string
        }
    } |
    {
        id: string
        label: string
        type: "slider",
        labels: string[]
    } |
    {
        id: string
        label: string
        type: "textArea",
    } |
    {
        id: string
        label: string
        type: "checkbox",
        options: string[]
    }

interface Page {
    title?: string
    footer?: string
    questions?: Question[]
}

const pages: Page[] = [
    {
        title: "Dear participant, we want to ask you a few more questions to understand how you performed the task. We appreciate your honesty. ",
    },
    {
        questions: [
            {
                label: "In the experiment, the money invested in each portfolio was:",
                options: [
                    "Split equally between several industries.",
                    "Split equally between several company stocks.",
                    "Neither of the above.",
                    "I don't know. "
                ],
                type: "radio",
                id: "didSplitEqually"
            },
        ]
    },
    {
        questions: [
            {
                label: "Question: What were you asked to choose in the task?",
                options: [
                    "The portfolio that performed better over the last week.",
                    "The portfolio that you predict will perform better in the future.",
                    "I don't know."
                ],
                type: "radio",
                id: "whatAskedToChoose"
            }
        ]
    },
    {
        questions: [
            {
                label: "Question: What does the information in the image below mean?",
                options: [
                    "The value of Portfolio QYN went up over the last week.",
                    "The value of the Materials stocks in Portfolio QYN went up over the last week.",
                    "The value of Company 1 stock from the Materials industry in Portfolio QYN went up over the last week.",
                    "I don't know."
                ],
                type: "radio",
                id: "whatInfoInImage",
                img: {
                    src: "/form-img.png",
                    alt: "form-img"
                }
            }
        ]
    },
    {
        questions: [
            {
                label: "When viewing the stock performance, did you mainly keep track of each industry's performance or the overall portfolio performance? If you mostly kept track of one of them, choose a value close to that side. You can also select a value in between. ",
                type: "slider",
                id: "didKeepTrack",
                labels: ["Kept track of industries", "Kept track of portfolios"]
            },
            {
                label: "How did you decide which portfolio was better? Please choose all the options that apply to you.",
                options: [
                    "I tried to select the portfolio that had more rising stocks.",
                    "I tried to select the portfolio that had better-performing industries.",
                    "I went with my intuition. ",
                    "I took notes.",
                    "Other: "
                ],
                type: "checkbox",
                id: "howDecided"
            },
            {
                label: "If you choose other, please explain:",
                type: "textArea",
                id: "howDecidedOther"
            },
            {
                label: "Did you count the stocks?",
                options: [
                    "Yes",
                    "No"
                ],
                type: "radio",
                id: "didCount"
            },
            {
                label: "While performing the task, did you write down information?",
                options: [
                    "Yes",
                    "No"
                ],
                type: "radio",
                id: "didWrite"
            },
            {
                label: "How much knowledge do you have regarding stock portfolios and investments?",
                options: [
                    "No knowledge.",
                    "Some knowledge.",
                    "A lot of knowledge."
                ],
                type: "radio",
                id: "familiarityWithStocks"
            },
            {
                label: "How much experience do you have with stock investment? ",
                options: [
                    "I never invested in stocks.",
                    "I have some experience with stock investment.",
                    "I invest in stocks regularly."
                ],
                type: "radio",
                id: "experienceWithStocks"
            },
            {
                label: "Were there unclear parts or issues in the experiment? We would be happy to hear your feedback. \nAddition comprehension test that did not appear in previous experiments: ",
                type: "textArea",
                id: "comments"
            }
        ]
    },
    {
        title: "Before completing this study, we would like to ask you a few more questions. Please remember that your answers will remain anonymous. ",
        questions: [
            {
                label: "In what Business program and year do you study?",
                options: [
                    "Bachelor in Business – first year",
                    "Bachelor in Business - second year or above",
                    "MBA",
                    "Other"
                ],
                type: "radio",
                id: "managementProgram"
            },
            {
                label: "Please enter your age: ",
                type: "text",
                id: "age"
            },
            {
                label: "What is your English level?",
                options: [
                    "Low",
                    "Intermediate",
                    "Advanced",
                    "Superior"
                ],
                type: "radio",
                id: "englishLevel"
            },
            {
                label: "To which gender identity do you most identify?",
                options: [
                    "woman",
                    "man",
                    "non-binary",
                    "prefer not to say"
                ],
                type: "radio",
                id: "gender"
            }
        ]
    }
]
const schema = object().shape({
    didSplitEqually: string().required("Please select an option."),
    whatAskedToChoose: string().required("Please select an option."),
    whatInfoInImage: string().required("Please select an option."),
    didKeepTrack: number().required("Please select an option."),
    howDecided: array().of(string()).required("Please select an option."),
    howDecidedOther: string().notRequired(),
    didCount: string().required("Please select an option."),
    didWrite: string().required("Please select an option."),
    familiarityWithStocks: string().required("Please select an option."),
    experienceWithStocks: string().required("Please select an option."),
    comments: string().notRequired(),
    managementProgram: string().notRequired(),
    age: string().notRequired(),
    englishLevel: string().required("Please select an option."),
    gender: string().notRequired(),
})

async function submitForm(body: Prisma.UserDetailsCreateWithoutSessionInput) {
    const res = await fetch("/api/personalDetails", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    })
    return res.json()
}

export default function PersonalDetails() {
    const [page, setPage] = useState(0)
    const router = useRouter()
    const formik = useFormik({
        validationSchema: schema,
        initialValues: {
            didSplitEqually: undefined,
            whatAskedToChoose: undefined,
            whatInfoInImage: undefined,
            howDecided: undefined,
            howDecidedOther: undefined,
            didCount: undefined,
            didWrite: undefined,
            familiarityWithStocks: undefined,
            experienceWithStocks: undefined,
            comments: undefined,
            managementProgram: undefined,
            age: undefined,
            englishLevel: undefined,
            gender: undefined,
        },
        onSubmit: async (values) => {
            if (page === pages.length - 1) {
                values = {
                    ...values,
                    howDecided: JSON.stringify(values.howDecided) as any,
                }
                await submitForm(values as any)
                router.replace("/finish")
            }
        },
    })

    function onBack() {
        setPage(prev => prev - 1)
        window.scrollTo(0, 0)
    }

    function onNext() {
        if (page < pages.length - 1) {
            setPage(page + 1)
            window.scrollTo(0, 0)
            return
        }
        formik.handleSubmit()
    }

    //
    // useEffect(() => {
    //     /* persist form data */
    //     const data = localStorage.getItem('form')
    //     if (data) {
    //         formik.setValues(JSON.parse(data))
    //     }
    // }, [])
    //
    // useEffect(() => {
    //     if (onceRef.current) {
    //         onceRef.current = false
    //         return
    //     }
    //     localStorage.setItem('form', JSON.stringify(formik.values))
    // }, [formik.values]);
    return (
        <div
            className="flex flex-col bg-white gap-4 min-h-screen justify-stretch py-20 px-10"
        >
            <Header className="text-xl text-gray-700 h-min px-5 py-6">
                {pages[page].title && pages[page].title}
            </Header>
            <form className="text-black flex flex-col gap-4 mx-6">
                {pages[page].questions?.map((question, index) => {
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
                                formik.errors[question.id as keyof typeof formik.errors] && formik.touched[question.id as keyof typeof formik.touched] ? (
                                    <span
                                        className="text-red-500 text-md">{formik.errors[question.id as keyof typeof formik.errors]}</span>
                                ) : null
                            }
                        </FormGroup>
                    )
                })}
                <div className="flex justify-center py-10 gap-6">
                    {
                        page > 0 && <CommonButton onClick={onBack}>Back</CommonButton>
                    }
                    <CommonButton onClick={onNext}>
                        {page === pages.length - 1 ? "Submit" : "Next"}
                    </CommonButton>
                </div>
            </form>
        </div>
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