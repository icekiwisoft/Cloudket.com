import { useContext, useState } from 'react'
import { playercontext } from './player'
import { baseURL } from '../../../utils/useAxios'
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PdfPlayer() {
    const { file, setfile, files } = useContext(playercontext)
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (

        <Document className={"pdfplayer"} file={`${baseURL}${files[file].file}`} onLoadSuccess={onDocumentLoadSuccess}>

            <div onClick={(e) => e.stopPropagation()}>
                {Array.apply(null, Array(numPages))
                    .map((x, i) => i + 1)
                    .map(page => <Page pageNumber={page} />)}
            </div>

        </Document>

    )


}