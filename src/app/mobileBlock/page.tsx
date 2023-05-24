import Header from "@components/header";
import CommonLayout from "@components/commonLayout";

export default function MobileBlock() {
    return (
        <CommonLayout>
            <Header centered={true}>
                Please visit the website on a desktop computer.
            </Header>
        </CommonLayout>

    )
}