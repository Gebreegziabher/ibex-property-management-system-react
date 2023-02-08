import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyAvailability from "../../../../globals/availability-enum";
import OfferAcceptanceStatus from "../../../../globals/offer-acceptance-status";
import PropertyStatusBadge from "../../../property-status-badge/property-status-badge";

const PropertyOffers = () => {

    const [propertyOffers, setPropertyOffers] = useState({});

    const fetchPropertyOffers = () => {
        setPropertyOffers(
            {
                id: 1,
                houseNumber: "RM 435",
                availability: PropertyAvailability.Available,
                price: 550000,
                squareFeet: 10000,
                numberOfBedRooms: 3,
                numberOfBathRooms: 2,
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, odio!",
                location: {
                    street: "1000 N 4th St",
                    city: "Fairfield",
                    state: "IA",
                    zipCode: "52557",
                },
                offers: [
                    {
                        id: 1,
                        propertyId: 1,
                        buyer: {
                            firstName: "Jackson",
                            lastName: "Oma",
                            email: "JackO@gmail.com",
                            phoneNumber: "+0828734222",
                            address: {
                                street: "1000 N 4th St",
                                city: "Fairfield",
                                state: "IA",
                                zipCode: "52557",
                            }
                        },
                        buyerProposedPrice: 500000,
                        acceptance: OfferAcceptanceStatus.Pending,
                    },
                    {
                        id: 2,
                        propertyId: 1,
                        buyer: {
                            firstName: "Hilary",
                            lastName: "Jack",
                            email: "JackO@gmail.com",
                            phoneNumber: "+0828734222",
                            address: {
                                street: "1000 N 4th St",
                                city: "Fairfield",
                                state: "IA",
                                zipCode: "52557",
                            }
                        },
                        buyerProposedPrice: 510000,
                        acceptance: OfferAcceptanceStatus.Pending,
                    },
                    {
                        id: 3,
                        propertyId: 1,
                        buyer: {
                            firstName: "Obama",
                            lastName: "Nelson",
                            email: "JackO@gmail.com",
                            phoneNumber: "+0828799222",
                            address: {
                                street: "1000 N 4th St",
                                city: "Fairfield",
                                state: "IA",
                                zipCode: "52557",
                            }
                        },
                        buyerProposedPrice: 510000,
                        acceptance: OfferAcceptanceStatus.Pending,
                    },
                ]
            }
        );
    }

    useEffect(() => fetchPropertyOffers(), []);

    const acceptOffer = (id) => {
        var offers = propertyOffers.offers;
        const updatedOffers = offers.map(i => i.id === id ? { ...i, acceptance: OfferAcceptanceStatus.Accepted } : i);
        const updatePropertyOffers = {
            ...propertyOffers,
            offers: updatedOffers,
            availability: PropertyAvailability.Pending
        };
        setPropertyOffers(updatePropertyOffers);

        //TODO: save to database
    };
    const rejectOffer = (id) => {
        var offers = propertyOffers.offers;
        const updatedOffers = offers.map(i => i.id === id ? { ...i, acceptance: OfferAcceptanceStatus.Rejected } : i);
        const updatePropertyOffers = {
            ...propertyOffers,
            offers: updatedOffers
        };
        setPropertyOffers(updatePropertyOffers);

        //TODO: save to database
    };

    const changeToContingent = (id) => {
        const updatePropertyOffers = {
            ...propertyOffers,
            availability: PropertyAvailability.Contingent
        };
        setPropertyOffers(updatePropertyOffers);

        //TODO: save to database
    };

    const changeToSold = (id) => {
        const updatePropertyOffers = {
            ...propertyOffers,
            availability: PropertyAvailability.Sold
        };
        setPropertyOffers(updatePropertyOffers);

        //TODO: save to database
    };

    let tableContent = null;

    if (propertyOffers.offers != undefined)
        tableContent = propertyOffers.offers.map(m => {
            return (
                <tr key={m.id}>
                    <td>{m.buyer.firstName} {m.buyer.lastName}</td>
                    <td>{m.buyer.email}</td>
                    <td>{m.buyer.phoneNumber}</td>
                    <td>{m.buyer.address.street}, {m.buyer.address.city}, {m.buyer.address.state}, {m.buyer.address.zipCode}</td>
                    <td>${m.buyerProposedPrice.toLocaleString()}</td>
                    <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            {
                                propertyOffers.availability == PropertyAvailability.Available ?
                                    <>
                                        {
                                            m.acceptance == OfferAcceptanceStatus.Pending ?
                                                <>
                                                    <button type="button" className="btn btn-success" title="Accept offer" onClick={() => acceptOffer(m.id)}>
                                                        Accept
                                                    </button>&nbsp;
                                                    <button type="button" className="btn btn-danger" title="Unlock user" onClick={() => rejectOffer(m.id)}>
                                                        Reject
                                                    </button>
                                                </>
                                                :
                                                m.acceptance == OfferAcceptanceStatus.Accepted ?
                                                    <button type="button" className="btn btn-success btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                    :
                                                    <button type="button" className="btn btn-danger btn-sm" disabled><i className="bi bi-x-circle"></i> {m.acceptance}</button>
                                        }
                                    </>
                                    :
                                    propertyOffers.availability == PropertyAvailability.Pending ?
                                        <>
                                            {
                                                m.acceptance == OfferAcceptanceStatus.Accepted ?
                                                    <>
                                                        <button type="button" className="btn btn-success btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                        &nbsp;
                                                        <button type="button" className="btn btn-warning" title="Change to continget" onClick={() => changeToContingent(m.id)}>
                                                            Change to continget
                                                        </button>&nbsp;
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            m.acceptance == OfferAcceptanceStatus.Rejected ?
                                                                <button type="button" className="btn btn-danger btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                                :
                                                                <>
                                                                </>
                                                        }
                                                    </>
                                            }
                                        </>
                                        :
                                        propertyOffers.availability == PropertyAvailability.Contingent ?
                                            <>
                                                {
                                                    m.acceptance == OfferAcceptanceStatus.Accepted ?
                                                        <>
                                                            <button type="button" className="btn btn-success btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                            &nbsp;
                                                            <button type="button" className="btn btn-secondary" title="Change to sold" onClick={() => changeToSold(m.id)}>
                                                                Change to sold
                                                            </button>&nbsp;
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                m.acceptance == OfferAcceptanceStatus.Rejected ?
                                                                    <button type="button" className="btn btn-danger btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                                    :
                                                                    <></>
                                                            }
                                                        </>
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    m.acceptance == OfferAcceptanceStatus.Accepted ?
                                                        <>
                                                            <button type="button" className="btn btn-secondary btn-sm" disabled><i className="bi bi-check-circle"></i> {propertyOffers.availability}</button>
                                                        </>
                                                        :
                                                        <>
                                                            {
                                                                m.acceptance == OfferAcceptanceStatus.Rejected ?
                                                                    <button type="button" className="btn btn-danger btn-sm" disabled><i className="bi bi-check-circle"></i> {m.acceptance}</button>
                                                                    :
                                                                    <></>
                                                            }
                                                        </>
                                                }
                                            </>
                            }
                        </div>
                    </td>
                </tr>
            );
        });

    return (
        <div className="container dashboard">
            <h1><Link to="/seller-dashboard" className="anchor"><i className="bx bx-chevron-left"></i>Back</Link></h1>

            {
                tableContent ?
                    <div className="alert alert-success" role="alert">
                        <h4 className="alert-heading">Offers for property <strong>{propertyOffers.houseNumber}</strong></h4>
                        <hr />
                        <div>
                            Location: <strong>{propertyOffers.location.street}, {propertyOffers.location.city}, {propertyOffers.location.state}, {propertyOffers.location.zipCode}</strong>
                            <PropertyStatusBadge availability={propertyOffers.availability} />
                        </div>
                    </div>
                    :
                    <div className="alert alert-warning" role="alert">
                        No offers are available for this property.
                    </div>
            }
            {
                tableContent &&
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Buyer name</th>
                            <th scope="col">Buyer email</th>
                            <th scope="col">Buyer phone number</th>
                            <th scope="col">Buyer address</th>
                            <th scope="col">Requested price</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            }
        </div>
    );
}
export default PropertyOffers;