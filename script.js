const generateBtn = document.getElementById("generate-btn")
const colorDisplay = document.getElementById("color-display")

generateBtn.addEventListener("click", ()=>{
    const hexValue = document.getElementById("color-picker").value.slice(1)
    const schemeMode = document.getElementById("mode-picker").value.toLowerCase()
    console.log(hexValue, schemeMode)
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${schemeMode}`)
        .then(res => res.json())
        .then(data => {
            colorDisplay.innerHTML = ""
            data.colors.forEach(color =>{
                const hex = color.hex.value
                colorDisplay.innerHTML += `
                    <div class="color-wrapper">
                        <div class="color-box" style="background-color:${hex}" title="RGB: ${color.rgb.value} | HSL: ${color.hsl.value}"></div>
                        <div class="hex-label">${hex}</div>
                    </div>
                `
                const wrappers = document.querySelectorAll(".color-wrapper");
                wrappers.forEach(wrapper => {
                    const box = wrapper.querySelector(".color-box");
                    const label = wrapper.querySelector(".hex-label");
                    const hex = label.textContent;

                    const copyToClipboard = () => {
                        navigator.clipboard.writeText(hex).then(() => {
                            label.textContent = "Copied!";
                            setTimeout(() => {
                                label.textContent = hex;
                            }, 1000);
                        });
                    };

                    box.addEventListener("click", copyToClipboard);
                    label.addEventListener("click", copyToClipboard);
                })
            })
        })
})