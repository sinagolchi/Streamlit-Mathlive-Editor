# Streamlit-Mathlive-Editor

A WYSWYG math expression editor for Streamlit using Mathlive math field and on-screen keyboard.
Additionally, the component returns the MathML expression of the mathematical expression in the field using MathJaX. 
![image](https://github.com/user-attachments/assets/008d2610-2d57-4220-a4c5-3f145b0fdac1)
## Installation instructions

```sh
pip install streamlit-mathlive
```

## Usage instructions


```python
import streamlit as st
from st_mathlive import mathfield

Tex, MathML = mathfield(title="Equation 1", value=r"\frac{1}{2} \times 5",)

st.latex(Tex)
st.write(MathML)

```
