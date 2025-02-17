"use client";
import { FC } from 'react';

// ==================================================
type AccordionProps = {
    no: string;
    body: string;
    heading: string;
    expand: boolean;
    type?: 'plain' | 'shadow-lg';
};
// ==================================================

const Accordion: FC<AccordionProps> = (props) => {
    const { no, body, heading, expand, type = '' } = props;

    return (
        <div className={`card ${type} accordion-item mb-1`}>
            <div className="card-header bg-pale-ash" id={`heading${no}`}
                data-bs-toggle="collapse"
                aria-controls={`collapse${no}`}
                data-bs-target={`#collapse${no}`}
                aria-expanded={expand ? 'true' : 'false'}

            >
                {heading}
            </div>

            <div
                id={`collapse${no}`}
                aria-labelledby={`heading${no}`}
                data-bs-parent="#accordionExample"
                className={`accordion-collapse collapse ${expand && 'show'}`}
            >
                <div className="card-body">
                    <p className='m-2'>{body}</p>
                </div>
            </div>
        </div>
    );
};

export default Accordion;
