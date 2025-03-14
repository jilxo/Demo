import {CSSProperties, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Divider} from "@mui/material";
import {decreeListSlice, DecreeListStateModel} from "./_redux/decreeListSlice.tsx";
import {isActionOf} from "../../../../redux/store.tsx";
import {toast} from "react-toastify";


export default function DecreeList() {

    const dispatch = useDispatch();

    const {decrees, result} = useSelector(({decreeList}) => decreeList) as DecreeListStateModel;

    useEffect(() => {
        if (isActionOf(result.action, decreeListSlice.actions.findError))
            toast.error(result.messageUser);
    }, [result])

    const loadActorTypeList = () => {
        if (isActionOf(result.action, decreeListSlice.actions.find))
            return;

        dispatch(decreeListSlice.actions.find())
    };

    useEffect(() => () => { dispatch(decreeListSlice.actions.clean()) }, []);

    useEffect(() => loadActorTypeList(), []);

    return (
        <div style={styles.container}>

            <h1>Decretos</h1>



            {decrees.map(({sections}) => sections.map(section => (
                <>
                    <h1>Sección {section.id}: {section.name}</h1>

                    {section.articles.map(article => (
                        <>
                            <h3>Articulo {article.id}: {article.name}</h3>

                            <p>{article.description}</p>

                            {article.literals.map(literal => (
                                <>
                                    <p><strong>Literal {literal.id}:</strong> {literal.description}</p>

                                    <ul>
                                        {literal.numerals.map(numeral => (
                                            <li>
                                                <p><strong>Numeral {numeral.id}:</strong> {numeral.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ))}

                            {article.paragraphs.map(paragraph => (
                                <p><strong>Paragrafo {paragraph.id}:</strong> {paragraph.description}</p>
                            ))}
                        </>
                    ))}

                    {section.subsections.map(subsection => (
                        <>
                            <h2>Subsección {subsection.id}: {subsection.name}</h2>

                            {subsection.articles.map(article => (
                                <>
                                    <h3>Articulo {article.id}: {article.name}</h3>

                                    <p>{article.description}</p>

                                    {article.literals.map(literal => (
                                        <>
                                            <p><strong>Literal {literal.id}:</strong> {literal.description}</p>

                                            <ul>
                                                {literal.numerals.map(numeral => (
                                                    <li>
                                                        <p><strong>Numeral {numeral.id}:</strong> {numeral.description}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ))}

                                    {article.paragraphs.map(paragraph => (
                                        <p><strong>Paragrafo {paragraph.id}:</strong> {paragraph.description}</p>
                                    ))}
                                </>
                            ))}
                        </>
                    ))}
                </>
            )))}

        </div>
    );
}

const styles = {
    container: {
        display: 'grid',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'auto auto',
    } as CSSProperties,
    action: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        margin: '10px 0 0',
        placeContent: 'center space-between',
        alignItems: 'center'
    } as CSSProperties,
    divider: {
        margin: '0 0 55px 0'
    } as CSSProperties,
    actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    } as CSSProperties,
    link: {
        textDecoration: 'none'
    } as CSSProperties,
    row: {
        display: 'grid',
        gridTemplateColumns: 'auto 160px',
        alignItems: 'stretch',
    } as CSSProperties,
    cell: {
        display: 'grid',
        alignContent: 'center',
        padding: '4px 16px',
    } as CSSProperties,
    tableHead: {
        padding: 0,
        display: 'grid',
        gridTemplateColumns: 'auto 160px',
        alignItems: 'stretch',
    }
};
