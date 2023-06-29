// 'use client';
// import {number, object, string} from 'yup';
// import {useFormik} from "formik";
// import CommonLayout from "@components/commonLayout";
// import Slider from "@components/slider";
// import {FC, useEffect} from "react";
// import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
// import {CommonButton} from "@components/button";
//
// /*
// the form includes the inputs :
// age : text
// gender : Radio button [woman, man, non-binary, prefer not to say]
// education : Radio button [No high school diploma, High school degree or equivalent, Some college - no degree, College degree (BA/BS/AA/AS), Professional degree/Doctorate (MD/MS/PhD)]
// howDecided : text area
// attention : Slider [1-10]
// didCount : Radio button [Yes, No]
// didWrite : Radio button [Yes, No]
// familiarityWithStocks : Slider [1-100]
// whatIsStock : text area
// whatIsPortfolio : text area
// didParticipateBefore : Radio button [Yes, No]
// didCheckMarkAppeared : Radio button [Yes, No]
// comments : text area (optional)
//  */
// function getExperimentIdFromState(state:RootState){
//     return state.experiment.experimentId!
// }
// const questions = [
//     {
//         label: 'Please enter your age:',
//         id   : 'age',
//         type : 'text'
//     },
//     {
//         label  : "To which gender identity do you most identify?",
//         id     : 'gender',
//         type   : 'radio',
//         options: ['woman', 'man', 'non-binary', 'prefer not to say']
//     },
//     {
//         label  : "What is the highest level of formal education you have completed?",
//         id     : 'education',
//         type   : 'radio',
//         options: ['No high school diploma', 'High school degree or equivalent', 'Some college - no degree', 'College degree (BA/BS/AA/AS)', 'Professional degree/Doctorate (MD/MS/PhD)']
//     },
//     {
//         label: "While performing the stock task, how did you decide which portfolio was better?",
//         id   : 'howDecided',
//         type : 'textArea'
//     },
//     {
//         label : "In the stock task, how would you say that your attention was divided between paying attention to each industry's performance and the overall portfolio performance? \nIf your attention was mostly directed at one of them choose a value close to that side. You can also choose a value in between.",
//         id    : 'attention',
//         type  : 'slider',
//         labels: ['Attention to Industries', 'Attention to Portfolio']
//     },
//     {
//         label  : "While performing the stock task, did you count the stocks?",
//         id     : 'didCount',
//         type   : 'radio',
//         options: ['Yes', 'No']
//     },
//     {
//         label  : "While performing the stock task, did you write down information?",
//         id     : 'didWrite',
//         type   : 'radio',
//         options: ['Yes', 'No']
//     },
//     {
//         label : "To what extent were you familiar with stocks and investments before this experiment?",
//         id    : 'familiarityWithStocks',
//         type  : 'slider',
//         labels: ['Not at all', 'To a great extent']
//     },
//     {
//         label: "According to what you know, what is a stock?",
//         id   : 'whatIsStock',
//         type : 'textArea'
//     },
//     {
//         label: "According to what you know, what is a stock portfolio?",
//         id   : 'whatIsPortfolio',
//         type : 'textArea'
//     },
//     {
//         label  : "Did you participate in a similar study before? Your participation will be counted either way",
//         id     : 'didParticipateBefore',
//         type   : 'radio',
//         options: ['Yes', 'No']
//     },
//     {
//         label  : "In your display, did a red or green check mark always appear?",
//         id     : 'didCheckMarkAppeared',
//         type   : 'radio',
//         options: ['Yes', 'No']
//     },
//     {
//         label: "Thank you for taking part in our study. This study was an initial pilot for a research project. If you have any feedback or comments, we would be happy to hear them.",
//         id   : 'comments',
//         type : 'textArea'
//     },
// ]
// const schema = object().shape({
//     age                  : number().required('This field is required'),
//     gender               : string().required('This field is required'),
//     education            : string().required('This field is required'),
//     howDecided           : string().required('This field is required'),
//     attention            : number().required('This field is required'),
//     didCount             : string().required('This field is required'),
//     didWrite             : string().required('This field is required'),
//     familiarityWithStocks: number().required('This field is required'),
//     whatIsStock          : string().required('This field is required'),
//     whatIsPortfolio      : string().required('This field is required'),
//     didParticipateBefore : string().required('This field is required'),
//     didCheckMarkAppeared : string().required('This field is required'),
//     comments             : string(),
// })
//
// export default function Form() {
//     const dispatch = useAppDispatch()
//     const formik = useFormik({
//         validationSchema: schema,
//         initialValues   : {
//             age                  : '',
//             gender               : '',
//             education            : '',
//             howDecided           : '',
//             attention            : undefined,
//             didCount             : '',
//             didWrite             : '',
//             familiarityWithStocks: undefined,
//             whatIsStock          : '',
//             whatIsPortfolio      : '',
//             didParticipateBefore : '',
//             didCheckMarkAppeared : '',
//             comments             : '',
//         },
//         onSubmit        : values => {
//             const personalDetailsToSave : PersonalDetails = {
//                 age                  : parseInt(values.age),
//                 gender : values.gender,
//                 attention : parseInt(values.attention!),
//                 didCount : values.didCount === 'Yes',
//                 didWrite : values.didWrite === 'Yes',
//                 familiarityWithStocks : parseInt(values.familiarityWithStocks!),
//                 whatIsStock : values.whatIsStock,
//                 whatIsPortfolio : values.whatIsPortfolio,
//                 didParticipateBefore : values.didParticipateBefore === 'Yes',
//                 didCheckMarkAppeared : values.didCheckMarkAppeared === 'Yes',
//                 comments : values.comments,
//                 education : values.education,
//                 howDecided : values.howDecided,
//                 belongsToExperiment : getExperimentIdFromState(store.getState()),
//             }
//         }
//     })
//     useEffect(() => {
//         /* persist form data */
//         const data = localStorage.getItem('form')
//         if (data) {
//             formik.setValues(JSON.parse(data))
//         }
//     }, [])
//     useEffect(() => {
//         /* persist form data */
//         localStorage.setItem('form', JSON.stringify(formik.values))
//     }, [formik.values])
//     return (
//         <CommonLayout header={
//             <FormGroup className="text-xl text-gray-700">
//                 Dear participant,<br/>
//                 Before completing this study, we would like to ask you a few more questions.<br/>
//                 Please remember that your answers will remain anonymous.
//             </FormGroup>
//         }
//         >
//             <form onSubmit={formik.handleSubmit} className="text-black flex flex-col gap-5">
//                 {questions.map((question, index) => {
//                     return (
//                         <FormGroup key={index} className="flex flex-col items-start">
//                             <label htmlFor={question.id}
//                                    className="mb-2 text-lg text-gray-900 whitespace-pre-wrap">{question.label}</label>
//                             {
//                                 question.type === 'text' &&
//                                 <input
//                                     id={question.id}
//                                     type="text"
//                                     onChange={formik.handleChange}
//                                     value={formik.values[question.id as keyof typeof formik.values]}
//                                     className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 max-w-sm"
//                                 />
//                             }
//                             {
//                                 question.type === 'radio' &&
//                                 question.options!.map((option, index) => {
//                                     return (
//                                         <div key={index} className="flex gap-2 items-center ms-1">
//                                             <input
//                                                 id={`${question.id}-${option}`}
//                                                 type="radio"
//                                                 onChange={formik.handleChange}
//                                                 value={option}
//                                                 name={question.id}
//                                                 className="border-black border-opacity-30 border rounded-md w-3 h-3"
//                                             />
//                                             <label htmlFor={`${question.id}-${option}`} className="mb-0.5 text-gray-700">{option}</label>
//                                         </div>
//                                     )
//                                 })
//                             }
//                             {
//                                 question.type === 'slider' &&
//                                 <div className="w-full pt-4">
//                                     <div className="flex justify-between px-5">
//                                         {/* left label */}
//                                         <div className="flex flex-col items-center gap-2">
//                                             <label htmlFor={question.id}>{question.labels![0]}</label>
//                                             <ArrowLeftIcon className="w-5 h-5 text-gray-700"/>
//                                         </div>
//                                         {/* right label */}
//                                         <div className="flex flex-col items-center gap-2">
//                                             <label htmlFor={question.id}>{question.labels![1]}</label>
//                                             <ArrowRightIcon className="w-5 h-5 text-gray-700"/>
//                                         </div>
//                                     </div>
//                                     <Slider
//                                         onChange={value => formik.setFieldValue(question.id, value)}
//                                         value={formik.values[question.id as keyof typeof formik.values] ? parseInt(formik.values[question.id as keyof typeof formik.values] as string) : undefined}
//                                         min={0}
//                                         max={100}
//                                     />
//                                 </div>
//                             }
//                             {
//                                 question.type === 'textArea' &&
//                                 <textarea
//                                     id={question.id}
//                                     onChange={formik.handleChange}
//                                     value={formik.values[question.id as keyof typeof formik.values]}
//                                     className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 max-w-xl basis-20"
//                                 />
//                             }
//                             {formik.errors[question.id as keyof typeof formik.errors] && formik.touched[question.id as keyof typeof formik.touched] ? (
//                                 <span className="text-red-500 text-md">{formik.errors[question.id as keyof typeof formik.errors]}</span>
//                             ) : null}
//                         </FormGroup>
//                     )
//                 })}
//                 <div className="flex justify-center">
//                 <CommonButton onClick={formik.handleSubmit}>Submit</CommonButton>
//                 </div>
//             </form>
//         </CommonLayout>
//     )
// }
//
//
// interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
//     children: React.ReactNode
// }
//
// const FormGroup: FC<FormGroupProps> = ({children, ...props}) => {
//     const className = `flex flex-col text-black items-start content-center justify-center shadow-lg rounded-lg ps-2 py-4 ${props.className}`
//     return (
//         <div {...props} className={className}>
//             {children}
//         </div>
//     )
// }