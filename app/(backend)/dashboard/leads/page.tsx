'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsArrowClockwise, BsArrowUp, BsArrowDown, BsArrowDownUp, BsEye } from "react-icons/bs";

import config from "@/config";
import { addUserLead, getUserLeads, updateSetUserLeads } from "@/src/firebase/firebase";
import { displayTimestamp } from "@/src/lib/functions/formatDate";
import { LeadData } from "@/src/types/LeadData";

type SortBy = "dateAsc" | "nameAsc" | "emailAsc" | "phoneAsc" | "typeAsc" | "dateDesc" | "nameDesc" | "emailDesc" | "phoneDesc" | "typeDesc";

export default function LeadsPage() {

  const [initializing, setInitializing] = useState(true);
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [selectedLead, setSelectedLead] = useState<LeadData>(null); //leads[0]
  const [sortBy, setSortBy] = useState("dateDesc");
  const [showLeadsInfoOffCanvas, setShowLeadsInfoOffCanvas] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getUserLeadsAsync = async () => {
    setRefreshing(true);
    try {
      const leads: LeadData[] | undefined = await getUserLeads();
      //sort leads by "sortBy"
      leads?.sort((a, b) => {
        switch (sortBy) {
          case "dateAsc":
            return a?.created_at?.seconds - b?.created_at?.seconds;
          case "nameAsc":
            return a?.name ? a?.name?.localeCompare(b?.name) : 0;
          case "emailAsc":
            return a?.email ? a?.email?.localeCompare(b?.email) : 0;
          case "phoneAsc":
            return a?.phone ? a?.phone?.localeCompare(b?.phone) : 0;
          case "typeAsc":
            return a?.type ? a?.type?.localeCompare(b?.type) : 0;
          case "dateDesc":
            return b?.created_at?.seconds - a?.created_at?.seconds;
          case "nameDesc":
            return b?.name ? b?.name?.localeCompare(a?.name) : 0;
          case "emailDesc":
            return b?.email ? b?.email?.localeCompare(a?.email) : 0;
          case "phoneDesc":
            return b?.phone ? b?.phone?.localeCompare(a?.phone) : 0;
          case "typeDesc":
            return b?.type ? b?.type?.localeCompare(a?.type) : 0;
          case "statusAsc":
            return a?.status ? a?.status?.localeCompare(b?.status) : 0;
          case "statusDesc":
            return b?.status ? b?.status?.localeCompare(a?.status) : 0;
          default:
            return 0;
        }
      });

      setLeads(leads);
    } catch (error) {
      console.log(`Error sorting leads: ${error}`)
    }

    setInitializing(false);
    setRefreshing(false);
  }

  const handleUpdateLead = async (leadId, field, value) => {
    //update lead status in Firestore
    updateSetUserLeads(leadId, field, value).then(() => {
      console.log(`Lead ${leadId} updated successfully`);
    })
    //update lead status in state
    const updatedLeads = [...leads];
    const index = updatedLeads?.findIndex((lead) => lead?.id === leadId);
    updatedLeads[index][field] = value;
    setLeads(updatedLeads);
  }

  const handleAddNewLeadSubmit = async (e) => {
    e?.preventDefault();
    const formData = new FormData(e?.target);
    const name = formData?.get("name");
    const email = formData?.get("email");
    const phone = formData?.get("phone");
    const type = formData?.get("type");
    const zipCode = formData?.get("zipCode");
    const status = formData?.get("status");
    const notes = formData?.get("notes");
    const created_at = new Date();
    const visibility = 'seen';
    const sourced = 'manual';


    //add new lead to Firestore
    await addUserLead({ name, email, phone, type, zipCode, status, notes, created_at, visibility, sourced });
    //refresh leads
    await getUserLeadsAsync();
    //close modal
    setSelectedLead(null);
  }

  useEffect(() => {
    getUserLeadsAsync();
  }, [sortBy])

  //make a loading screen with a spinner
  if (initializing) return (
    <div style={{ minHeight: "50vh" }} className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border text-primary1" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  return (
    <div>
      <div className="row mt-2 mb-2">
        <div className="col-12 d-flex justify-content-end align-items-center mb-2 ">
          <button data-bs-toggle="modal" data-bs-target="#modal-02" className="btn btn-primary rounded-pill btn-sm mx-1 mb-2 mb-md-0">
            + Create Lead
          </button>
          <button className="btn btn-secondary rounded-pill btn-sm mx-1 mb-2 mb-md-0"
            onClick={() => {
              getUserLeadsAsync();
            }}
          >
            {refreshing ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div>
                <BsArrowClockwise /> Refresh
              </div>
            )
            }
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped table-responsive" >
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">
                Name
                {/* Sorting */}
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'nameAsc') setSortBy('nameDesc');
                      else setSortBy('nameAsc');
                    }}
                  >
                    {sortBy === 'nameAsc' && <BsArrowUp />}
                    {sortBy === 'nameDesc' && <BsArrowDown />}
                    {sortBy !== 'nameAsc' && sortBy !== 'nameDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
              <th scope="col">
                Email
                {/* Sorting */}
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'emailAsc') setSortBy('emailDesc');
                      else setSortBy('emailAsc');
                    }}
                  >
                    {sortBy === 'emailAsc' && <BsArrowUp />}
                    {sortBy === 'emailDesc' && <BsArrowDown />}
                    {sortBy !== 'emailAsc' && sortBy !== 'emailDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
              <th scope="col">
                Phone
                {/* Sorting */}
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'phoneAsc') setSortBy('phoneDesc');
                      else setSortBy('phoneAsc');
                    }}
                  >
                    {sortBy === 'phoneAsc' && <BsArrowUp />}
                    {sortBy === 'phoneDesc' && <BsArrowDown />}
                    {sortBy !== 'phoneAsc' && sortBy !== 'phoneDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
              <th scope="col">
                Type
                {/* Sorting */}
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'typeAsc') setSortBy('typeDesc');
                      else setSortBy('typeAsc');
                    }}
                  >
                    {sortBy === 'typeAsc' && <BsArrowUp />}
                    {sortBy === 'typeDesc' && <BsArrowDown />}
                    {sortBy !== 'typeAsc' && sortBy !== 'typeDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
              <th scope="col">
                Date
                {/* Sorting */}
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'dateAsc') setSortBy('dateDesc');
                      else setSortBy('dateAsc');
                    }}
                  >
                    {sortBy === 'dateAsc' && <BsArrowUp />}
                    {sortBy === 'dateDesc' && <BsArrowDown />}
                    {sortBy !== 'dateAsc' && sortBy !== 'dateDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
              <th scope="col">
                Status
                <div className="btn-group m-0" role="group" aria-label="Basic outlined example">
                  <button type="button" className="btn btn-sm"
                    onClick={() => {
                      if (sortBy === 'statusAsc') setSortBy('statusDesc');
                      else setSortBy('statusAsc');
                    }}
                  >
                    {sortBy === 'statusAsc' && <BsArrowUp />}
                    {sortBy === 'statusDesc' && <BsArrowDown />}
                    {sortBy !== 'statusAsc' && sortBy !== 'statusDesc' && <BsArrowDownUp />}
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {leads?.length > 0 && leads?.map((lead, index) => (
              <tr key={index}>
                <td>
                  <button type="button" className="btn btn-circle btn-soft-primary btn-sm" aria-controls="leadsInfo" onClick={() => {
                    setSelectedLead(null);
                    setSelectedLead(lead);
                    setShowLeadsInfoOffCanvas(true);
                  }}>
                    <BsEye />
                  </button>
                </td>
                <td>{lead?.name}</td>
                <td>{lead?.email}</td>
                <td>{lead?.phone}</td>
                <td>{lead?.type?.replace('_lead', '')}</td>
                <td>{displayTimestamp(lead?.created_at?.seconds)}</td>
                <td>
                  <div className="form-select-wrapper">
                    <select
                      className={`form-select ${lead?.status ? config?.dashboardLeadsStatus?.options?.find((option) => option?.value === lead?.status)?.class : ''}`}
                      onChange={(e) => {
                        handleUpdateLead(lead?.id, 'status', e?.target?.value);
                      }}
                    >
                      {config?.dashboardLeadsStatus?.options?.map((option, index) => {
                        return (
                          <option key={index} value={option?.value} selected={lead?.status === option?.value}>{option?.name}</option>
                        )
                      })}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
            {leads?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  <div className="p-5">
                    <h4>No leads yet</h4>
                    <p>If you started a campaign, you will see the leads here as soon as they come in.</p>
                    <p>If you haven't started a campaign yet, you can start one now.</p>
                    <Link href="/pricing" className="btn btn-primary">
                      Start a campaign
                    </Link>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={`offcanvas shadow-xl p-3 bg-white rounded bg-gray offcanvas-end ${showLeadsInfoOffCanvas ? 'show' : ''}`} data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="leadsInfo" aria-labelledby="leadsInfoLabel"
        style={{
          minWidth: '50%',
          color: "black",
        }}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="leadsInfoLabel">Lead Details</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowLeadsInfoOffCanvas(false)}></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Name</label>
                          <input type="text" className="form-control" id="name" name="name" value={selectedLead?.name || ''}
                            onChange={(e) => {
                              handleUpdateLead(selectedLead?.id, 'name', e?.target?.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input type="email" className="form-control" id="email" name="email" value={selectedLead?.email || ''}
                            onChange={(e) => {
                              handleUpdateLead(selectedLead?.id, 'email', e?.target?.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label">Phone</label>
                          <input type="tel" className="form-control" id="phone" name="phone" value={selectedLead?.phone || ''}
                            onChange={(e) => {
                              handleUpdateLead(selectedLead?.id, 'phone', e?.target?.value);
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="type" className="form-label">Type</label>
                          <input type="text" className="form-control" id="type" name="type" value={(selectedLead?.type as string)?.replace('_lead', '')} readOnly />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">Status</label>
                          <select className={`form-select ${selectedLead?.status ? config?.dashboardLeadsStatus?.options?.find((option) => option?.value === selectedLead?.status)?.class : ''}`}
                            onChange={(e) => {
                              handleUpdateLead(selectedLead?.id, 'status', e?.target?.value);
                            }}
                          >
                            {config?.dashboardLeadsStatus?.options?.map((option, index) => {
                              return (
                                <option key={index} value={option?.value} selected={selectedLead?.status === option?.value}>{option?.name}</option>
                              )
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-3">
                          <label htmlFor="notes" className="form-label">Notes</label>
                          <textarea className="form-control" id="notes" name="notes" value={selectedLead?.notes ? selectedLead?.notes : ''}
                            onChange={(e) => {
                              handleUpdateLead(selectedLead?.id, 'notes', e?.target?.value);
                            }}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Response to home value questions of seller leads*/}
                {(selectedLead?.type === 'seller_lead' && selectedLead?.[config?.homeValueQuestions?.step3?.field]) && (
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <h5 className="mb-3">Pre-qualification Questionnaire:</h5>
                        </div>
                      </div>
                      <div className="row gap-2">
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">{config?.homeValueQuestions?.step3?.question}</label>
                          </div>
                          <div className="col-sm-6">
                            <span className="text-primary1">{selectedLead?.[config?.homeValueQuestions?.step3?.field] ? "Yes" : "No"}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">{config?.homeValueQuestions?.step4?.question}</label>
                          </div>
                          <div className="col-sm-6">
                            <span className="text-primary1"
                            >{selectedLead?.[config?.homeValueQuestions?.step4?.field] ? selectedLead?.[config?.homeValueQuestions?.step4?.field] : "Didn't answered"}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">{config?.homeValueQuestions?.step5?.question}</label>
                          </div>
                          <div className="col-sm-6">
                            <span className="text-primary1"
                            >{selectedLead?.[config?.homeValueQuestions?.step5?.field] ? selectedLead?.[config?.homeValueQuestions?.step5?.field] : "Didn't answered"}</span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <label className="form-label">{config?.homeValueQuestions?.step6?.question}</label>
                          </div>
                          <div className="col-sm-6">
                            <span className="text-primary1"
                            >{selectedLead?.[config?.homeValueQuestions?.step6?.field] ? selectedLead?.[config?.homeValueQuestions?.step6?.field] : "Didn't answered"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12">
                      {/* Property Report  */}
                      <div className="row">
                        <div className="col-12">
                          {selectedLead?.propertyData?.data?.address?.formatted_street_address && (
                            <div className="row">
                              <h5 className="mb-3">Property Details:</h5>
                              <div className="col-sm-6">
                                {/* Satelite image */}
                                {(selectedLead?.propertyData?.data?.address?.formatted_street_address && selectedLead?.propertyData?.data?.address?.city && selectedLead?.propertyData?.data?.address?.zip_code) && (
                                  <div className="row">
                                    <iframe style={{ border: 0, width: 500, height: 500, borderRadius: '1rem' }} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps/embed/v1/place?key=${config?.googleMapsApiKey}&q=${selectedLead?.propertyData?.data?.address?.formatted_street_address},${selectedLead?.propertyData?.data?.address?.city},${selectedLead?.propertyData?.data?.address?.zip_code}`}>
                                    </iframe>
                                  </div>
                                )}
                              </div>
                              <div className="col-sm-6">
                                {selectedLead?.propertyData?.data?.address?.formatted_street_address && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Address</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.address?.formatted_street_address}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.address?.city && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">City</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.address?.city}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.address?.state && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">State</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.address?.state}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.address?.zip_code && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Zip</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1" >{selectedLead?.propertyData?.data?.address?.zip_code}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.structure?.beds_count && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Bedrooms</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.structure?.beds_count}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.structure?.baths && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Bathrooms</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.structure?.baths}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.structure?.total_area_sq_ft && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Total Area</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.structure?.total_area_sq_ft} sqft</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.structure?.year_built && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Year Built</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.structure?.year_built}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.structure?.stories && (
                                  <div className="row">
                                    <div className="col-sm-6">
                                      <label className="form-label">Stories</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="text-primary1">{selectedLead?.propertyData?.data?.structure?.stories}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.valuation?.low > 50000 && (
                                  <div className="row mb-1">
                                    <div className="col-sm-6">
                                      <label className="form-label">Low Valuation</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="btn btn-outline-primary btn-sm">${selectedLead?.propertyData?.data?.valuation?.low}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.valuation?.value > 50000 && (
                                  <div className="row mb-1">
                                    <div className="col-sm-6">
                                      <label className="form-label">Average</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="btn btn-outline-primary">${selectedLead?.propertyData?.data?.valuation?.value}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedLead?.propertyData?.data?.valuation?.high > 50000 && (
                                  <div className="row mb-1">
                                    <div className="col-sm-6">
                                      <label className="form-label">High Valuation</label>
                                    </div>
                                    <div className="col-sm-6">
                                      <span className="btn btn-outline-primary btn-sm">${selectedLead?.propertyData?.data?.valuation?.high}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {/* Response to questions of buyer leads*/}
                {(selectedLead?.type === 'buyer_lead' && selectedLead?.buyBedrooms) && (
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12">
                          <h5 className="mb-3">Pre-qualification Questionnaire:</h5>
                        </div>
                      </div>
                      <div className="row gap-2">
                        {/* buyBedrooms */}
                        {selectedLead?.buyBedrooms && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">How many bedrooms are you looking for?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.buyBedrooms}</span>
                            </div>
                          </div>
                        )}
                        {/* buyBathrooms */}
                        {selectedLead?.buyBathrooms && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">How many bathrooms are you looking for?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.buyBathrooms}</span>
                            </div>
                          </div>
                        )}
                        {/* buyMinPrice */}
                        {/* buyMaxPrice */}
                        {(selectedLead?.buyMinPrice && selectedLead?.buyMaxPrice) && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">What is your budget?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.buyMinPrice} - {selectedLead?.buyMaxPrice}</span>
                            </div>
                          </div>
                        )}
                        {/* homeTypes (array of strings) */}
                        {selectedLead?.homeTypes && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">What type of home are you looking for?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.homeTypes?.join(', ')}</span>
                            </div>
                          </div>
                        )}
                        {/* buyTimeframe */}
                        {selectedLead?.buyTimeframe && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">What is your timeframe?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.buyTimeframe}</span>
                            </div>
                          </div>
                        )}
                        {/* mustSell boolean*/}
                        {selectedLead?.mustSell && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">Do you need to sell your home first?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.mustSell ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                        )}
                        {/* buyReason */}
                        {selectedLead?.buyReason && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">What is your reason for buying?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.buyReason}</span>
                            </div>
                          </div>
                        )}
                        {/* workingWithAgent boolean */}
                        {selectedLead?.workingWithAgent && (
                          <div className="row">
                            <div className="col-sm-6">
                              <label className="form-label">Are you working with an agent?</label>
                            </div>
                            <div className="col-sm-6">
                              <span className="text-primary1">{selectedLead?.workingWithAgent ? 'Yes' : 'No'}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="modal fade" id="modal-02" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content text-center">
            <div className="modal-body">
              <h5 className="modal-title">Create New Lead</h5>
              <span className="text-muted">Fill out the form below to create a new lead. This lead will also be sent to your CRM if you have one connected.</span>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              <form onSubmit={handleAddNewLeadSubmit}>
                <div className="row text-start">
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" name="name" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" name="email" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">Phone</label>
                      <input type="tel" className="form-control" id="phone" name="phone" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="type" className="form-label">Type</label>
                      <select className="form-select" id="type" name="type">
                        <option value="buyer_lead">Buyer</option>
                        <option value="seller_lead">Seller</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="zipCode" className="form-label">Zip Code</label>
                      <input type="text" className="form-control" id="zipCode" name="zipCode" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="status" className="form-label">Status</label>
                      <select className="form-select" id="status" name="status">
                        {config?.dashboardLeadsStatus?.options?.map((option, index) => {
                          return (
                            <option key={index} value={option?.value}>{option?.name}</option>
                          )
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb-3">
                      <label htmlFor="notes" className="form-label">Notes</label>
                      <textarea className="form-control" id="notes" name="notes"></textarea>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Create Lead</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}