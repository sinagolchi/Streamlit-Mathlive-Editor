# Streamlit-Mathlive-Editor

A WYSWYG math expression editor for Streamlit using Mathlive mathfield and on-screen keyboard

## Installation instructions

```sh
pip install streamlit-mathlive-editor
```

## Usage instructions

```python
import streamlit as st

from streamlit_mathlive_editor import mathfield

MathML, Tex = mathfield(title="Equation 1", value=r"\frac{1}{2} \times 5",)

st.write(MathML)
st.write(Tex)
```