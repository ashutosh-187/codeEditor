import React, { useEffect, useState, useRef } from 'react';
import { Prism } from "prism-react-renderer";

function Editor() {
    const codeSnippet = `const add = (a, b)=>{
    let sum = a+b;
    return sum;
    };
    add(5, 10);`;

    const [code, setCode] = useState(codeSnippet);
    const textareaRef = useRef(null);
    const codeContainerRef = useRef(null);

    const handleScroll = () => {
        const textarea = textareaRef.current;
        const codeContainer = codeContainerRef.current;
        if (textarea && codeContainer) {
            codeContainer.scrollTop = textarea.scrollTop;
        }
    };

    const indentation = (e) => {
        const start = e.target.selectionStart;
        const end = e.target.selectionEnd;
        if (e.key === 'Tab') {
            e.preventDefault();
            setCode(code.substring(0, start) + "    " + code.substring(end));
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
            }, 0);
        }
    };

    const syncScroll = () => {
        const textarea = textareaRef.current;
        const codeContainer = codeContainerRef.current;
        if (textarea && codeContainer) {
            codeContainer.scrollTop = textarea.scrollTop;
        }
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        const codeContainer = codeContainerRef.current;

        if (textarea) {
            const syncScrollAndHeight = () => {
                textarea.style.height = 'auto';
                codeContainer.style.height = 'auto';

                const newHeight = `${textarea.scrollHeight}px`;

                textarea.style.height = newHeight;
                codeContainer.style.height = newHeight;

                syncScroll();
            };

            syncScrollAndHeight();

            textarea.addEventListener('scroll', handleScroll);
            textarea.addEventListener('input', syncScrollAndHeight);

            return () => {
                textarea.removeEventListener('scroll', handleScroll);
                textarea.removeEventListener('input', syncScrollAndHeight);
            };
        }
    }, [code]);

    return (
        <div className='relative w-96 max-h-96'>
            <div 
                ref={codeContainerRef}
                className='absolute top-0 left-0 w-full max-h-96 p-3 pointer-events-none bg-gray-100 rounded overflow-auto whitespace-pre-wrap'
                dangerouslySetInnerHTML={{ __html: Prism.highlight(code, Prism.languages.javascript, 'javascript') }} 
            />
            <textarea
                ref={textareaRef}
                className='relative w-full max-h-96 p-3 bg-transparent border-none outline-none resize-none z-10 text-transparent caret-black overflow-auto'
                placeholder='Enter your code'
                onChange={(e) => setCode(e.target.value)}
                value={code}
                onKeyDown={indentation}
                onScroll={handleScroll}
                spellCheck="false"
            />
        </div>
    );
}

export default Editor;
