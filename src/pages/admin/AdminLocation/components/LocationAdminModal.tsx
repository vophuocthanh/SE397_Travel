
import React from 'react'
import LocationAdminForm from './LocationAdminForm';
import { LocationSchemaType } from '@/lib/shcema';

interface LocationAdminModalsProps {
    isOpen: boolean;
    onClose: () => void;
    tab?: string;
    onOpenModal: (type: "create") => void;
    type: "create" ;
}

const LocationAdminModal: React.FC<LocationAdminModalsProps> = ({
    isOpen,
    onClose,
}) => {
    const handleCloseModal = () => {
    onClose();
    };
    const handleSubmit = (formData: LocationSchemaType) => {
    console.log("Form submitted with data:", formData);

    onClose();
    };
    return (
        <>
            {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
                <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-blueGray-200">
                    <h3 className="text-3xl font-semibold">
                    <h3 className="text-3xl font-semibold">
                        Create Location
                    </h3>
                    </h3>

                    <button
                    className="float-right p-1 ml-auto text-3xl font-semibold leading-none text-black bg-transparent border-0 outline-none opacity-5 focus:outline-none"
                    onClick={handleCloseModal}
                    >
                    <span className="block w-6 h-6 text-2xl text-black bg-transparent outline-none opacity-5 focus:outline-none">
                        ×
                    </span>
                    </button>
                </div>
                <div className="relative flex-auto p-6">
                    <LocationAdminForm
                    onSubmit={handleSubmit}
                    onClose={handleCloseModal}
                    type="create"
                    />
                </div>
                </div>
            </div>
            </div>
        )}
        {isOpen && <div className="fixed inset-0 z-40 bg-black opacity-25"></div>}</>
    )
}

export default LocationAdminModal