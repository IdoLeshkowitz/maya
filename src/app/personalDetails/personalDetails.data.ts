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
    {
        //screen 2
        questions: [
            {
                label: "In the instructions, you were told that the money invested in each portfolio was:",
                options: [
                    "Divided equally between \"several company stocks\"",
                    "Divided equally between \"several different industries\""
                ],
                type: "radio",
                id: "didSplitEqually",
                validation: string().required("Please select an option.")
            },
        ]
    },
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
    {
        //screen 4
        questions: [
            {
                label: "Examine the image below. In this image, \"Real Estate\" is a type of",
                options: [
                    "Portfolio",
                    "Industry",
                    "Stock"
                ],
                type: "radio",
                id: "whatInfoInImage",
                img: {
                    src: "/presentation_stock.png",
                    alt: "presentation_stock"
                },
                validation: string().required("Please select an option.")
            }
        ]
    },
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
                    "I selected the portfolio with more rising stocks.",
                    "I selected the portfolio with better-perfoming industries.",
                    "I went with my intuition.",
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
                label: "How have you acquired knowledge about stock investment? Please choose all the options that apply to you.",
                options: [
                    "Academic courses",
                    "Online forums or tutorials",
                    "Non-academic lectures and courses",
                    "Other",
                    "I haven't acquired knowledge"
                ],
                type: "checkbox",
                id: "howAcquired",
                validation: array().of(string()).required("Please select an option.")
            },
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
                label: "Relative to the population, how well do you understand stock investment?",
                type: "slider",
                id: "populationKnowledgeable",
                labels: ["Below average", "Above average"],
                validation: number().required("Please select an option.")
            },
            {
                label: "Relative to the population, how good do you think you are in stock investments?",// add <strong> 
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
                    "Technical/ Community college ",
                    "Undergraduate degree (BA/BSc/other)",
                    "Graduate degree/Doctorate (MA/MD/MBA/MSc/PhD)"
                ],
                type: "radio",
                id: "educationBFAMEObtained",
                validation: string().required("Please select an option.")
            },
            {
                label: "What is the highest level of education you are currently pursuing in the fields of Business, Finance, Accounting, Management, and Economics?",
                options: [
                    "None",
                    "Technical/ Community college ",
                    "Undergraduate degree (BA/BSc/other)",
                    "Graduate degree/Doctorate (MA/MD/MBA/MSc/PhD)"
                ],
                type: "radio",
                id: "educationBFAMEPursue",
                validation: string().required("Please select an option.")
            },
            {
                label: "If you are currently studying one of the subjects: Business, Finance, Accounting, Management, and Economics, what year of your program are you in?",
                options: [
                    "Currently, I do not study these subjects",
                    "First year",
                    "Second year or above",
                    "Third year and above"
                ],
                type: "radio",
                id: "programYear",
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