import streamlit as st
import numpy as np
import pandas as pd
import plotly.express as px
import time

files = ["./signals/healthy_emg.csv", "./signals/healthy_ecg.csv"]


st.set_page_config(page_title="signal viewer webapp", layout="wide")

st.title("Signal Viewer application")

file_selector = st.selectbox(label="Select file", options=files)

for file in files:
    if file == file_selector:
        df = pd.read_csv(file)


place_holder = st.empty()

signal_length = int(np.ceil((len(df)-1) / 10))


for seconds in range(signal_length):

    # temp_df = pd.DataFrame(df)

    with place_holder.container():
        fig_col = st.container()

        with fig_col:
            st.markdown("### First Chart")
            fig = px.line(data_frame=df, y='Value', x='Time')
            fig.update_xaxes()
            st.write(fig)

        st.markdown("### Detailed Data View")
        st.dataframe(df)
        time.sleep(1)
