import React, { useEffect, useState, useMemo } from 'react';
import { Header } from "../../../components";
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { comboBoxItems, selectItems } from "~/constants";
import {cn, formatKey} from "../../../lib/utils";
import {LayerDirective, LayersDirective, MapsComponent} from "@syncfusion/ej2-react-maps";
import {world_map} from "~/constants/world_map";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {account} from "~/appwrite/client";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

interface Country {
    name: string;
    coordinates: number[];
    value: string;
    openStreetMap?: string;
}
const CreateTrip = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const navigate = useNavigate()
    const [error,setError]=useState<string|null>(null)
    const[loading,setLoading]=useState(false)
    const [formData, setFormData] = useState<TripFormData>({
        country: countries[0]?.name || '',
        travelStyle: '',
        interest: '',
        budget: '',
        duration: 0,
        groupType: ''
    });
    const handleChange = (key: keyof TripFormData, value: string) => {
        setFormData({...formData, [key]: value});
    };

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        if( !formData.country ||
            !formData.travelStyle ||
            !formData.interest ||
            !formData.budget ||
            !formData.groupType) {
            toast.error('Please fill all the fields')
            setLoading(false)
            return;
        }
        if(formData.duration < 1 || formData.duration > 10) {
            toast.error('Duration must be between 1 and 10 days')
            setLoading(false)
            return;
        }
        const user = await account.get()
        if(!user.$id){
            console.log("user not authenticated")
            setLoading(false)
            return
        }
        try {
            const response = await fetch('/api/create-trip', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    country: formData.country,
                    numberOfDays: formData.duration,
                    travelStyle: formData.travelStyle,
                    interests: formData.interest,
                    budget: formData.budget,
                    groupType: formData.groupType,
                    userId: user.$id
                })
            })
            const result: CreateTripResponse = await response.json();
            if(result?.id) navigate(`/trips/${result.id}`)
            else console.error('Failed to generate a trip')
        }catch (error){
            console.log(error)

        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    'https://restcountries.com/v3.1/all?fields=name,latlng,maps'
                );
                if (!response.ok) throw new Error("Failed to fetch countries");

                const data = await response.json();
                const formatted = data.map((country: any) => ({
                    name: country.name.common,
                    coordinates: country.latlng,
                    value: country.name.common,
                    openStreetMap: country.maps?.openStreetMaps,
                }));
                setCountries(formatted);
            } catch (err) {
                console.error("Error fetching countries:", err);
            }
        };

        fetchCountries();
    }, []);


    const countryData = useMemo(
        () =>
            countries.map((country) => ({
                text: country.name,
                value: country.value,
            })),
        [countries]
    );
    const mapData = [
        {
            country: formData.country,
            color: '#EA382E',
            coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
        }
    ]
    return (
        <main className="flex flex-col gap-10 pb-20 wrapper">
            <Header
                title="Add a New Trip"
                description="View and edit AI Generated travel plans"
            />
            <section className="mt-2.5 wrapper-md">
                <form className="trip-form" onSubmit={handleSubmit}>
                    {/* Country ComboBox */}
                    <div>
                        <label htmlFor="country">Country</label>
                        <ComboBoxComponent
                            id="country"
                            dataSource={countryData}
                            fields={{ text: 'text', value: 'value' }}
                            placeholder="Select a country"
                            className="combo-box"
                            change={(e: { value: string | undefined }) => {
                                if (e.value) {
                                    handleChange('country', e.value);
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();
                                e.updateData(
                                    countryData.filter((item) =>
                                        item.text.toLowerCase().includes(query)
                                    )
                                );
                            }}
                        />
                    </div>

                    {/* Duration Input */}
                    <div>
                        <label htmlFor="duration">Duration</label>
                        <input
                            id="duration"
                            name="duration"
                            type="number"
                            placeholder="Enter number of days"
                            className="form-input placeholder:text-gray-100"
                            onChange={(e) => handleChange('duration', e.target.value)}
                        />
                    </div>

                    {/* Dynamic Select Fields */}
                    {selectItems.map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{formatKey(key)}</label>
                            <ComboBoxComponent
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text: item,
                                    value: item,
                                }))}
                                fields={{ text: 'text', value: 'value' }}
                                placeholder={`Select ${formatKey(key)}`}
                                className="combo-box"
                                change={(e: { value: string | undefined }) => {
                                    if (e.value) {
                                        handleChange(key, e.value);
                                    }
                                }}
                                allowFiltering
                                filtering={(e) => {
                                    const query = e.text.toLowerCase();
                                    e.updateData(
                                        comboBoxItems[key]
                                            .filter((item) =>
                                                item.toLowerCase().includes(query)
                                            )
                                            .map((item) => ({
                                                text: item,
                                                value: item,
                                            }))
                                    );
                                }}
                            />
                        </div>
                    ))}
                    <div>
                        <label htmlFor="location">Location on the world map</label>
                        <MapsComponent>
                            <LayersDirective>
                                <LayerDirective shapeData={world_map} dataSource={mapData}   shapePropertyPath="name"
                                                shapeDataPath="country"
                                                shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}/>
                            </LayersDirective>
                        </MapsComponent>
                    </div>

                    <div className="bg-gray-200 h-px w-full" />
                    {error && (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    )}
                    <footer className="px-6 w-full">
                        <ButtonComponent type="submit"
                                         className="button-class !h-12 !w-full" disabled={loading}
                        >
                            <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn("size-5", {'animate-spin': loading})} />
                            <span className="p-16-semibold text-white">
                                {loading ? 'Generating...' : 'Generate Trip'}
                            </span>
                        </ButtonComponent>
                    </footer>
                </form>
            </section>
        </main>
    );
};

export default CreateTrip;
