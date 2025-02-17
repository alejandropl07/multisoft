'use client';

import { UserContext } from '@/src/context';
import { exportLeads, getUserIntegrationSettings, getUserNotificationSettings, setUserIntegrationSettings, setUserNotificationSettings, stripeOpenPortal } from '@/src/firebase/firebase';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

declare global {
   namespace JSX {
    interface IntrinsicElements {
      "zapier-workflow": any;
      "zapier-full-experience": any;
    }
  }  
}


export default function IntegrationsPage () {

    const [initializing, setInitializing] = useState(true);

    let uid: string = ''
    const user = useContext(UserContext);
    if (user){
        uid = user?.user?.uid;
    }

    const [settings, setSettings] = useState<any>({});


    const getIntegrationsSettings = async() => {
        const settings = await getUserIntegrationSettings(uid);

        if (settings){
            setSettings(settings);
        }

        //Generate a new API key if the user doesn't have one
        if (!settings?.zapierKey){
            const newKey = Math.random().toString(36).substring(2, 8).toUpperCase();
            if (newKey){
                setSettings({...settings, zapierKey: newKey});
                setUserIntegrationSettings(uid, {zapierKey: newKey});
                console.log('New key generated')
            }
        }
    }

    useEffect(() => {
      getIntegrationsSettings();
      setInitializing(false);
    }, [])


    //make a loading screen with a spinner
    if (initializing) return (
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )

    return (
      <div className="row mt-2 mb-2">
        <div className="col">
          <div className="p-5 rounded-xl bg-white shadow-lg mb-2">
            <div className="d-flex align-items-center mb-2 gap-2">
              <h3 className='m-0'>Your Zapier Key</h3>
              <input className="form-control form-control-xl" style={{ width: 'calc(15 * 8px)' }} disabled value={settings?.zapierKey} />
              <button className="btn btn-primary" onClick={async () => {
                  toast.success(`Copied "${settings?.zapierKey}" to clipboard`);
                  await navigator.clipboard.writeText(settings?.zapierKey);
              }}>
                  <i className="bi bi-clipboard me-1"></i>Copy
              </button>
            </div>
            <zapier-workflow
              sign-up-email="email_of_your_user@example.com"
              sign-up-first-name="first_name_of_your_user"
              sign-up-last-name="last_name_of_your_user"
              client-id="6XCIhjjxAwQVWkz2FAxB3nSkFB4uL4khKPrcoyVU"
              theme="light"
              intro-copy-display="show"
              zap-create-from-scratch-display="hide"
            />
          </div>
        </div> 
        
      </div>
    )
}