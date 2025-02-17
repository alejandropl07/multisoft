'use client';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BsTrash, BsEnvelopeFill, BsClipboard } from "react-icons/bs";

// import { useUser } from '@/lib/context';
import { exportLeads, getUserIntegrationSettings, getUserNotificationSettings, setUserIntegrationSettings, setUserNotificationSettings, stripeOpenPortal } from '@/src/firebase/firebase';
import { formatPhoneNumber } from '@/src/lib/functions/formatPhoneNumber';
import AccountDeletion from '@/src/components/AccountDeletion';
import CredentialsSettings from '@/src/components/CredentialsSettings';
// import NextLink from '@/components/reuseable/NextLink';
import { useAppSelector } from '@/src/redux/hooks';

export default function SettingsPage() {

  const [initializing, setInitializing] = useState(true);

  let uid: string = ''
  const { user } = useAppSelector(state => state.auth)
  if (user) {
    uid = user?.uid;
  }

  const [settings, setSettings] = useState<any>({});
  const [exporting, setExporting] = useState(false);

  const [leadAlertSMS, setLeadAlertSMS] = useState(false);
  const [leadAlertSMSValue, setLeadAlertSMSValue] = useState('');
  const [leadAlertSMSPhones, setLeadAlertSMSPhones] = useState<any[]>([]);
  const [leadAlertEmail, setLeadAlertEmail] = useState(false);
  const [leadAlertEmailValue, setLeadAlertEmailValue] = useState('');
  const [leadAlertEmails, setLeadAlertEmails] = useState<any[]>([]);

  const [portalUrl, setPortalUrl] = useState<string>('');
  const [portalLastUpdated, setPortalLastUpdated] = useState(new Date());
  const [loadingCard, setLoadingCard] = useState(false);

  function isValidEmail(text: string) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(text);
  }

  const getNotificationsSettings = async () => {
    //Cloud Settings
    const results = await getUserNotificationSettings(uid);


    //Sync Settings with Firebase
    if (results) {
      //Check the Status of the SMS Notifications
      if (results?.leadAlertPhoneStatus === true) {
        setLeadAlertSMS(true)
      }

      //Get phone numbers in Firestore
      if (results?.leadAlertPhones) {
        setLeadAlertSMSPhones(results?.leadAlertPhones)
      }

      //Check the Status of the Email Notifications
      if (results?.leadAlertEmailStatus === true) {
        setLeadAlertEmail(true)
      }

      //Get Emails in Firestore
      if (results?.leadAlertEmails) {
        setLeadAlertEmails(results?.leadAlertEmails)
      }
    }
  }

  const handleLeadAlertSMSStatus = () => {
    setUserNotificationSettings(uid, {
      leadAlertPhoneStatus: !leadAlertSMS
    })
  }

  const handleLeadAlertSMS = () => {
    setUserNotificationSettings(uid, {
      leadAlertPhones: leadAlertSMSPhones
    })
    console.log(leadAlertSMSPhones)
  }

  const handleLeadAlertEmailStatus = () => {
    setUserNotificationSettings(uid, {
      leadAlertEmailStatus: !leadAlertEmail
    })
  }

  const handleLeadAlertEmail = () => {
    setUserNotificationSettings(uid, {
      leadAlertEmails: leadAlertEmails
    })
    console.log(leadAlertEmails)
  }



  const getIntegrationsSettings = async () => {
    const settings = await getUserIntegrationSettings(uid);

    if (settings) {
      setSettings(settings);
    }

    //Generate a new API key if the user doesn't have one
    if (!settings?.zapierKey) {
      const newKey = Math.random().toString(36).substring(2, 8).toUpperCase();
      if (newKey) {
        setSettings({ ...settings, zapierKey: newKey });
        setUserIntegrationSettings(uid, { zapierKey: newKey });
        console.log('New key generated')
      }
    }
  }

  const handleLeadExport = async () => {
    setExporting(true);
    console.log('Exporting leads')
    const response: any = await exportLeads()
      .then((response) => {
        console.log('Response', response)
        setExporting(false);
        return response;
      })
      .catch((error) => {
        console.log('Error', error)
        setExporting(false);
        console.log(`Error exporting leads. Please try again or contact support.`)
        return error;
      });
    if (response?.data?.url && response?.data?.total > 0) {
      console.log('Exported leads')
      console.log(`Exported ${response?.data?.total} leads. Downloading...`)
      window.open(response?.data?.url, '_blank');
    } else {
      toast.warning(`No leads to export. If you think this is an error, please contact support.`)
    }

  }

  const handleOpenPortal = async () => {
    setLoadingCard(true)
    //check if user has portal url and its been less than 2 hours
    if (portalUrl != '' && portalLastUpdated && (new Date().getTime() - portalLastUpdated.getTime()) < 7200000) {
      window.location.href = portalUrl;
      return;
    }
    let session: any;
    try {
      session = await stripeOpenPortal()
    } catch (error) {
      console.log(error)
      toast.error(`Error opening billing portal. Please try again or contact support.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
    console.log(session)
    if (session?.data?.url) {
      setPortalUrl(session.data.url)
      setPortalLastUpdated(new Date())
      window.location.href = session?.data?.url
    } else {
      toast.warning(`Create a subscription first to access your billing settings.`)
    }
    setLoadingCard(false)
  }


  useEffect(() => {
    Promise.all([getNotificationsSettings(), getIntegrationsSettings()])
      .then(() => {
        console.log("Notifications and Integrations Settings fetched succesfully")
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setInitializing(false);
      })
  }, []);


  //make a loading screen with a spinner
  if (initializing) return (
    <div style={{ minHeight: "50vh" }} className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  return (
    <div className="row pt-2 pb-5">
      <div className="col-sm-12">
        <div className="setting-card mb-2">
          <div className='row'>
            <div className="col-sm-8">
              <h3 className="mb-2">Billing</h3>
              <p className="text-sm mb-2">Manage your billing settings</p>
            </div>
            <div className="col-sm-4 text-end">
              <button
                className="btn btn-primary"
                disabled={loadingCard}
                onClick={async () => {
                  await handleOpenPortal();
                  setLoadingCard(false)
                }}
              >
                {loadingCard ? 'Loading...' : 'Manage Billing'}
              </button>
            </div>
          </div>
        </div>
        <div className="setting-card mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="">SMS Notifications</h3>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <button
                className={`btn btn-sm ${leadAlertSMS ? 'btn-outline-primary' : 'btn-primary'}`}
                onClick={() => {
                  setLeadAlertSMS(!leadAlertSMS);
                  handleLeadAlertSMSStatus();
                }}>
                {leadAlertSMS ? 'Disable' : 'Enable'}</button>
            </div>
          </div>
          {leadAlertSMS && (
            <div className="d-flex flex-column">
              <div className='row'>
                <div className='col-sm-6'>
                  <span className="text-sm mb-2">Start typing to add phone numbers</span>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">+1</span>
                    <input type="tel" className="form-control" placeholder="" aria-label="Phone Number" aria-describedby="basic-addon1" style={{ maxWidth: '200px' }}
                      value={leadAlertSMSValue}
                      onChange={(e) => {
                        const text = e.target.value;
                        if (text.length === 10) {
                          let temp = leadAlertSMSPhones;
                          temp.push(text);
                          setLeadAlertSMSPhones([...temp]);
                          handleLeadAlertSMS();
                          setLeadAlertSMSValue('');
                        } else {
                          setLeadAlertSMSValue(text);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className='col-sm-6'>
                  <div className="d-flex flex-wrap gap-1 mb-3 mt-4">
                    {leadAlertSMSPhones.map((phone, index) => (
                      <button className="btn btn-sm btn-outline-primary rounded-pill p-2 align-items-center justify-content-center" key={`${phone}_${index}`}
                        onClick={() => {
                          let temp = leadAlertSMSPhones;
                          temp.splice(index, 1);
                          setLeadAlertSMSPhones([...temp]);
                          handleLeadAlertSMS();
                        }}
                      >
                        <span className='me-1'>{formatPhoneNumber(phone)}</span> <BsTrash />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
            </div>
          )}
        </div>
        <div className="setting-card mb-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h3 className="">Email Notifications</h3>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <button className={`btn btn-sm ${leadAlertEmail ? 'btn-outline-primary' : 'btn-primary'}`} onClick={() => {
                setLeadAlertEmail(!leadAlertEmail);
                handleLeadAlertEmailStatus();
              }}>{leadAlertEmail ? 'Disable' : 'Enable'}</button>
            </div>
          </div>
          {leadAlertEmail && (
            <div className="d-flex flex-column ">
              <div className='row'>
                <div className='col-sm-6'>
                  <div className='row'>
                    <div className='col-12'>
                      <span className="text-sm mb-2 mt-2">Start typing to add emails</span>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><BsEnvelopeFill className="bi bi-envelope-fill" /></span>
                        <input type="email" className="form-control" placeholder="johndoe@gmail.com" aria-label="Email" aria-describedby="basic-addon1"
                          value={leadAlertEmailValue}
                          onChange={(e) => {
                            const text = e.target.value;
                            setLeadAlertEmailValue(text);
                          }}
                        />
                        <button className="btn btn-primary" type="button" id="button-addon2"
                          onClick={() => {
                            if (isValidEmail(leadAlertEmailValue)) {
                              let temp = leadAlertEmails;
                              temp.push(leadAlertEmailValue);
                              setLeadAlertEmails([...temp]);
                              handleLeadAlertEmail();
                              setLeadAlertEmailValue('');
                            } else {
                              toast.warning(`Please enter a valid email address`);
                            }
                          }}
                        >Add</button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className='col-sm-6'>
                  <div className="d-flex flex-wrap gap-1 mb-3 mt-4">
                    {leadAlertEmails.map((email, index) => (
                      <button className="btn btn-sm btn-outline-primary rounded-pill p-2 align-items-center justify-content-center" key={index}
                        onClick={() => {
                          let temp = leadAlertEmails;
                          temp.splice(index, 1);
                          setLeadAlertEmails([...temp]);
                          handleLeadAlertEmail();
                        }}
                      >
                        <span className='me-1'>{email}</span> <BsTrash />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="setting-card mb-2">
          <h3 className="mb-2">Export Leads</h3>
          <div className="col-12">
            <p className="text-sm mb-2">Export your leads to a CSV file. This file will automatically download to your computer.</p>
            <button
              className="btn btn-primary"
              disabled={exporting}
              onClick={async () => {
                handleLeadExport();
              }}
            >
              {exporting ? 'Exporting...' : 'Export All Leads'}
            </button>
          </div>
        </div>

        <CredentialsSettings />

        <AccountDeletion />
      </div>
        {/* <div className="setting-card mb-2">
          <h3 className="mb-2">Zapier</h3>
          <p className="text-sm mb-2">Your Private Key</p>
          <div className="d-flex mb-5 align-items-center gap-2">
            <input className="form-control form-control-xl" style={{ width: 'calc(32 * 8px)' }} disabled value={settings?.zapierKey} />
            <button className="btn btn-primary" onClick={async () => {
              toast.success(`Copied "${settings?.zapierKey}" to clipboard`);
              await navigator.clipboard.writeText(settings?.zapierKey);
            }}>
              <BsClipboard className="bi bi-clipboard me-1" /> Copy
            </button>
          </div>
          <div className="col-12">
            <p className="text-sm">Zapier is a tool that allows you to connect apps you use every day to automate tasks and save time.</p>
            <NextLink href={`/zapier`} title={`Learn how to connect Zapier`} className='btn btn-gradient gradient-1 rounded-pill' />
          </div>
        </div> */}

    </div>
  )
}