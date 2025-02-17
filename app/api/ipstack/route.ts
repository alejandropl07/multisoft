import { NextRequest ,NextResponse } from 'next/server'
import axios from 'axios'

const IPSTACK_KEY = process.env.IPSTACK_KEY;

export async function GET(req: NextRequest) {
    
    //get the ip address from the request
    let ip = req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || req.ip;

    if (ip === '::1') {
        ip = 'check';
    }

    console.log(`IP Address: ${ip}`);
    
    const apiUrl = `https://api.ipstack.com/${ip}?access_key=${IPSTACK_KEY}`;
    
    const resp = await axios.get(apiUrl)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error(error);
            return null;
        });

    return NextResponse.json(resp);
    
}