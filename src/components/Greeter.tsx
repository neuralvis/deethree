import React from "react";

interface GreeterProps {
    name: string;
}

const Greeter: React.FC<GreeterProps> = (props: GreeterProps) => {
    const name = props.name;
    return (
        <section>
            <h1>Welcome {name} to Typescript and React!</h1>
        </section>
    );
};

export default Greeter;