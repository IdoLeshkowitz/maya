import {array, number, Schema, string} from "yup";

export interface Page {
    title?: string
    footer?: string
    questions?: Question[],
}

export const personalDetailsPages: Page[] = [
    {
        //screen 1
        title: "Dear participant, we want to ask you a few questions to understand how you performed the task.",
    },
    // {
    //     //screen 2
    //     questions: [
    //         {
    //             label: "In the experiment, the money invested in each portfolio was:",
    //             options: [
    //                 "Split equally between the company stocks.",
    //                 "Split equally between the industries.",
    //                 "Both of the above.",
    //                 "Neither of the above.",
    //                 "I don't know. "
    //             ],
    //             type: "radio",
    //             id: "didSplitEqually",
    //             validation: string().required("Please select an option.")
    //         },
    //     ]
    // },
    {
        //screen 3
        questions: [
            {
                label: "What portfolio were you asked to choose in the experiment?",
                options: [
                    "The portfolio that performed better.",
                    "The portfolio that will perform better in the future.",
                    "I don't know."
                ],
                type: "radio",
                id: "whatAskedToChoose",
                validation: string().required("Please select an option.")
            }
        ]
    },
    // {
    //     //screen 4
    //     questions: [
    //         {
    //             label: "What does the information in the image below mean?",
    //             options: [
    //                 "The value of Portfolio QYN went up.",
    //                 "The value of the Materials stocks in Portfolio QYN went up.",
    //                 "The value of Company 1 stock from the Materials industry in Portfolio QYN went up.",
    //                 "I don't know."
    //             ],
    //             type: "radio",
    //             id: "whatInfoInImage",
    //             img: {
    //                 src: "/form-img.png",
    //                 alt: "form-img"
    //             },
    //             validation: string().required("Please select an option.")
    //         }
    //     ]
    // },
    { //screen 5questions:
        questions: [
            {

                label: "To what extent did you keep track of each industry's performance throughout the task?",
                type: "slider",
                id: "trackIndustry",
                labels: ["Not at all", "To a great extent"],
                validation: number().required("Please select an option.")
            },
            {
                label: "To what extent did you keep track of the overall portfolio performance throughout the task?",
                type: "slider",
                id: "trackPortfolio",
                labels: ["Not at all", "To a great extent"],
                validation: number().required("Please select an option.")
            },
            {
                label: "How did you decide which portfolio was better? Please choose all the options that apply to you.",
                options: [
                    "I selected the portfolio that many of its industries had at least one stock that performed very well.",
                    "I selected the portfolio that had an industry with many well-performing stocks.",
                    "I followed my intuition.",
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
            }

        ]
    },
    {//screen 6
        questions: [
            {
                label: "How knowledgeable are you regarding stock portfolios and investments?",
                type: "slider",
                id: "knowledgeable",
                labels: ["Not at all", "To a great extent"],
                validation: number().required("Please select an option.")
            },
            {
                label: "How experienced are you with stock investments? ",
                type: "slider",
                id: "experienced",
                labels: ["Not at all", "To a great extent"],
                validation: number().required("Please select an option.")
            },
            {
                label: "Relative to the population, how good do you think you are in stock investments on a scale of 0 to 100, where 50 is the population average?",
                type: "slider",
                id: "populationGood",
                labels: ["Below average", "Above average"],
                validation: number().required("Please select an option.")
            }
        ]
    },
    {
        title: "Before completing this study, we would like to ask you a few more questions. Please remember that your answers will remain anonymous. ",
        questions: [
            {
                label: "From the following list, please mark all the subjects you have studied in the past or are currently studying.",
                options: [
                    "Business",
                    "Finance",
                    "Accounting",
                    "Management",
                    "Economics",
                    "Engineering",
                    "Mathematics",
                    "Biology",
                    "Chemistry",
                    "Physics",
                    "Engineering",
                    "None of the above"
                ],
                type: "checkbox",
                id: "subjects",
                validation: array().of(string()).required("Please select an option.")
            },
            {
                label: "What is the highest level of education you have obtained in the fields of Business, Finance, Accounting, Management, and Economics?",
                options: [
                    "None",
                    "Some college (no degree)",
                    "College degree (BA/BSc/AA/AS)",
                    "Graduate degree/Doctorate (MA/MD/MBA/MSc/PhD)"
                ],
                type: "radio",
                id: "educationBFAMEObtained",
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
                label: "Were there unclear parts or issues in the experiment? We would be happy to hear your feedback.",
                type: "textArea",
                id: "comments",
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