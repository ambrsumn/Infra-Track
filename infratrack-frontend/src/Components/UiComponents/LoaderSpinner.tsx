import React, { CSSProperties, useState } from 'react'
import { FadeLoader, MoonLoader, HashLoader } from "react-spinners";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
function LoaderSpinner() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState('#32CD32');

    return (
        <div className="sweet-loading w-full h-full flex justify-center items-center">

            <FadeLoader
                color={color}
                loading={loading}
                cssOverride={override}
                // size={50}
                radius={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
}

export default LoaderSpinner
