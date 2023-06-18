import { Workspace } from 'polotno/canvas/workspace';
import { store, page } from './PolotnoConfig'
import { Button, TextField } from "@mui/material";
import { useState } from 'react';
import { createClient } from 'pexels';
import { Configuration, OpenAIApi } from 'openai';

import './CreateRandomCanva.css'

const client = createClient('FkLEMxm4lili3Ths4gr8WzQjW2eGxyCzCKeMyX2HjfYW7DLiH8ny57pS');
const configuration = new Configuration({
    organization: "org-5IsvkmTumIUsUqYYi0598nsx",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

function CreateRandomCanva() {
    const [keyword, setKeyword] = useState("");

    const buildPage = async () => {
        const response = await client.photos.search({ query: keyword, page: Math.floor(Math.random() * 10), per_page: 1 });
        if (response && response.photos.length > 0) {
            page.addElement({
                type: 'image',
                x: 0,
                y: 0,
                rotation: 0,
                locked: false, // deprecated
                blurEnabled: false,
                blurRadius: 10,
                brightnessEnabled: false,
                brightness: 0,
                shadowEnabled: false,
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'black',
                shadowOpacity: 1,
                name: `image-${keyword}`,
                src: response.photos[0].src.landscape,
                width: 1000,
                height: 1000,
                borderColor: 'black',
                borderSize: 5,
            });

            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `A quote containing the word ${keyword}` }],
            });

            page.addElement({
                type: 'text',
                x: 10,
                y: 10,
                rotation: 0,
                blurEnabled: false,
                blurRadius: 10,
                brightnessEnabled: false,
                brightness: 0,
                shadowEnabled: false,
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'white',
                shadowOpacity: 1,
                name: `quote-${keyword}`,
                text: completion?.data?.choices[0]?.message?.content,
                placeholder: '',
                fontSize: 26,
                fontFamily: 'Roboto',
                fontStyle: 'italic', // can be normal or italic
                fontWeight: 'bold', // can be normal or bold or some other CSS variations
                textDecoration: '',
                fill: 'white',
                align: 'center',
                width: 500,
                height: 100,
                strokeWidth: 0,
                stroke: 'white',
                lineHeight: 1,
                letterSpacing: 0, // % from font size,
            });
        }
    }

    return (
        <div className="canvaContainer">
            <div className="keywordContainer">
                <TextField
                    required
                    id="outlined-required"
                    label="Keyword"
                    defaultValue={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <Button variant="contained" onClick={buildPage}>BUILD</Button>
            </div>
            <div style={{ height: '100vh' }}>
                <Workspace store={store} />
            </div>
            <a href="https://www.pexels.com">Photos provided by Pexels</a>
        </div>
    );
}

export default CreateRandomCanva;