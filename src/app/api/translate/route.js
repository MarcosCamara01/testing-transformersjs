// Create a custom request handler for the /classify route.
// For more information, see https://nextjs.org/docs/app/building-your-application/routing/router-handlers

import { NextResponse } from 'next/server'
import PipelineSingleton from '../../lib/pipeline.js';

export async function GET(request) {
    const text = request.nextUrl.searchParams.get('text');
    const from = request.nextUrl.searchParams.get('from');
    const to = request.nextUrl.searchParams.get('to');

    if (!text) {
        return NextResponse.json({
            error: 'Missing text parameter',
        }, { status: 400 });
    }

    const translator = await PipelineSingleton.getInstance('translation', `Xenova/opus-mt-es-en`);
    
    const result = await translator(text);

    return NextResponse.json(result);
}