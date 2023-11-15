// Create a custom request handler for the /classify route.
// For more information, see https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from 'next/server'
import PipelineSingleton from '../../lib/pipeline.js';

export async function GET(request) {
    const text = request.nextUrl.searchParams.get('text');

    const task = 'summarization';
    const model = 'Xenova/distilbart-cnn-6-6';

    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }

    const summarise = await PipelineSingleton.getInstance(task, model);

    const result = await summarise(text, {
        max_new_tokens: 500,
    });

    return NextResponse.json(result);
}