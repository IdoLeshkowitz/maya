import {getAllPersonalDetails} from "@services/personalDetailsService";

const columns = [
    "id",
    "belongs_to_experiment",
    "age",
    "gender",
    "education",
    "how_decided",
    "attention",
    "did_count",
    "did_write",
    "familiarity_with_stocks",
    "what_is_stock",
    "what_is_portfolio",
    "did_participate_before",
    "did_check_mark_appeared",
    "comments"
];

export default async function PersonalDetailsPage() {
    const allPersonalDetails = await getAllPersonalDetails()
    return (
        <div className="min-h-screen bg-white min-w-max">
            <table className="bg-white text-black  table-auto border border-slate-500 border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className="border border-slate-500" key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allPersonalDetails.map((personalDetails) => {
                        return (
                            <tr key={personalDetails._id?.toString()}>
                                <td className="border border-slate-500">{personalDetails._id?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.belongsToExperiment?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.age?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.gender?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.education?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.howDecided?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.attention?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.didCount?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.didWrite?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.familiarityWithStocks?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.whatIsStock?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.whatIsPortfolio?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.didParticipateBefore?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.didCheckMarkAppeared?.toString()}</td>
                                <td className="border border-slate-500">{personalDetails.comments?.toString()}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export const revalidate = 60 ;