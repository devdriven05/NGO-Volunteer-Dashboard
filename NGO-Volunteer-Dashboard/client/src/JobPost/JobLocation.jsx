
const JobLocation = ({ setLocation, location }) => {
    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setLocation((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="p-6 flex flex-col gap-4 bg-white-100 border border-white-300 rounded-lg">
            <h3 className="text-lg font-semibold">Job Location</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex-1">
                    <label htmlFor="country" className="text-sm text-gray-600">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={location.country}
                        onChange={handleLocationChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter Country"
                    />
                </div>

                <div className="flex-1">
                    <label htmlFor="city" className="text-sm text-gray-600">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={location.city}
                        onChange={handleLocationChange}
                        className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                        placeholder="Enter City"
                    />
                </div>
            </div>

            <div className="flex-1">
                <label htmlFor="address" className="text-sm text-gray-600">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={location.address}
                    onChange={handleLocationChange}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Address"
                />
            </div>
        </div>
    );
};

export default JobLocation;
