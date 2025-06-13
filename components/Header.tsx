import {Link, useLocation} from "react-router";
import {IntlBase} from "@syncfusion/ej2-base";
import getActualDateTimeFormat = IntlBase.getActualDateTimeFormat;
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {cn} from "../lib/utils";

interface Props {
    title: string;
    description: string;
    ctaText?: string;
    ctaUrl?: string;
}

const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
    const location = useLocation();

    return (
        <header className="header">
            <article>
                <h1 className={cn("text-dark-100",  location.pathname === '/' ? 'text-2xl md:text-4xl font-bold': 'text-xl md:text-2xl font-semibold')}>{title}</h1>
                <p className={cn("text-gray-100 font-normal",  location.pathname === '/' ? 'text-base md:text-lg': 'text-sm md:text-lg')}>{description}</p>
            </article>
        </header>
    )
}
export default Header