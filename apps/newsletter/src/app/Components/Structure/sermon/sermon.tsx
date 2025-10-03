import { FC } from 'react';
import './sermon.scss';
import { ChurchServiceTranscript, getBibleReferencesInSermon } from "@auto-church-newsletter/service-transcript";

let mockTranscript: ChurchServiceTranscript | null = null;

interface SermonProps {
   serviceTranscript?: ChurchServiceTranscript;
}

const Sermon: FC<SermonProps> = ({ serviceTranscript }) => (
 <div className="sermon-wrapper" id="sermon">
    <div className='verses'>
       <h3>Key Verses</h3>
       <ul>
            {serviceTranscript ? printBibleRefs(serviceTranscript) : <li>Loading...</li>}
       </ul>
    </div>
    </div>
 );

export default Sermon;


const printBibleRefs = (serviceTranscript: ChurchServiceTranscript) =>  getBibleReferencesInSermon(serviceTranscript)
   .map((segment, index) => (
      <li className='verse' key={index}>{segment.book} {segment.chapter}:{segment.verse ?? segment.verses}</li>
   ))