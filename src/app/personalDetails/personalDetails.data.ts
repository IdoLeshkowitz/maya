import {array, number, Schema, string} from "yup";

export interface Page {
    title?: string
    footer?: string
    questions?: Question[],
}

export const personalDetailsPages: Page[] = [
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
                id: "didSplitEqually",
                validation: string().required("Please select an option.")
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
                id: "whatAskedToChoose",
                validation: string().required("Please select an option.")
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
                },
                validation: string().required("Please select an option.")
            }
        ]
    },
    {
        questions: [
            {
                label: "When viewing the stock performance, did you mainly keep track of each industry's performance or the overall portfolio performance? If you mostly kept track of one of them, choose a value close to that side. You can also select a value in between. ",
                type: "slider",
                id: "didKeepTrack",
                labels: ["Kept track of industries", "Kept track of portfolios"],
                validation: number().required("Please select an option.")
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
                id: "howDecided",
                validation: array().of(string()).required("Please select an option.")
            },
            {
                label: "If you choose other, please explain:",
                type: "textArea",
                id: "howDecidedOther",
                validation: string().notRequired()
            },
            {
                label: "Did you count the stocks?",
                options: [
                    "Yes",
                    "No"
                ],
                type: "radio",
                id: "didCount",
                validation: string().required("Please select an option.")
            },
            {
                label: "While performing the task, did you write down information?",
                options: [
                    "Yes",
                    "No"
                ],
                type: "radio",
                id: "didWrite",
                validation: string().required("Please select an option.")
            },
            {
                label: "How much knowledge do you have regarding stock portfolios and investments?",
                options: [
                    "No knowledge.",
                    "Some knowledge.",
                    "A lot of knowledge."
                ],
                type: "radio",
                id: "familiarityWithStocks",
                validation: string().required("Please select an option.")
            },
            {
                label: "How much experience do you have with stock investment? ",
                options: [
                    "I never invested in stocks.",
                    "I have some experience with stock investment.",
                    "I invest in stocks regularly."
                ],
                type: "radio",
                id: "experienceWithStocks",
                validation: string().required("Please select an option.")
            },
            {
                label: "Were there unclear parts or issues in the experiment? We would be happy to hear your feedback. \nAddition comprehension test that did not appear in previous experiments: ",
                type: "textArea",
                id: "comments",
                validation: string().notRequired()
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
                id: "managementProgram",
                validation: string().notRequired()
            },
            {
                label: "Please enter your age: ",
                type: "text",
                id: "age",
                validation: string().notRequired()
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
                id: "englishLevel",
                validation: string().required("Please select an option.")
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
                id: "gender",
                validation: string().notRequired()
            }
        ]
    }
]

type BaseQuestion = {
    id: string
    label: string
    validation: Schema
}

type TextQuestion = { type: "text" } & BaseQuestion
type RadioQuestion = { type: "radio", options: string[], img?: { src: string, alt: string } } & BaseQuestion
type SliderQuestion = { type: "slider", labels: string[] } & BaseQuestion
type TextAreaQuestion = { type: "textArea" } & BaseQuestion
type CheckboxQuestion = { type: "checkbox", options: string[] } & BaseQuestion
export type Question = TextQuestion | RadioQuestion | SliderQuestion | TextAreaQuestion | CheckboxQuestion