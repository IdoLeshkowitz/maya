"use client"

import {useFormik} from "formik";
import {clsx} from "clsx";
import {validateUserNameAndPassword} from "@/app/admin/signin/actions";

export default function AdminSigninPage() {
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (values) => {
            try {
                await validateUserNameAndPassword({username: values.username, password: values.password})
            } catch (e) {
                console.error(e)
            }
        }
    })
    return (
        <div className="bg-white text-slate-700 min-h-screen flex justify-evenly items-center">
            <form
                className="flex flex-col justify-evenly items-center gap-3"
                onSubmit={formik.handleSubmit}
            >
                <input
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    placeholder="username"
                    className={clsx("rounded-md border border-slate-500 px-10 py-3", {
                        "border-red-500": formik.values.username === ""
                    })}/>
                <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="password"
                    className={clsx("rounded-md border border-slate-500 px-10 py-3", {
                        "border-red-500": formik.values.password === ""
                    })}/>
                <button
                    type="submit"
                    className="rounded-md border border-slate-500 px-10 py-3"
                >
                    submit
                </button>
            </form>
        </div>
    )
}