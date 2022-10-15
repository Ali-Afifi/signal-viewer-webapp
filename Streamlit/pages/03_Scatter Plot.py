import streamlit as st
import matplotlib.pyplot as plt


df = st.session_state['df']

fig, ax = plt.subplots(1,1)
ax.scatter(x=df['Depth'], y = df["Magnitude"])
ax.set_xlabel('Depth')
ax.set_ylabel('Magnitude')

st.pyplot(fig)
