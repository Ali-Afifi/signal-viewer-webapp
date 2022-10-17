import streamlit as st
import numpy as np
import pandas as pd
import plotly.express as px
import time

files = ["./signals/healthy_emg.csv", "./signals/healthy_ecg.csv"]


st.set_page_config(page_title="signal viewer webapp", layout="wide")

st.title("Signal Viewer application")

file_selector = st.selectbox(label="Select file", options=files, index=1)

for file in files:
    if file == file_selector:
        df = pd.read_csv(file)


place_holder = st.empty()


signal_length = len(df) - 1
signal_chunks = int(np.ceil(signal_length / 10))

i = 0


for seconds in range(signal_chunks):

    temp_df = None

    if i < signal_length:
        temp_df = df.iloc[i:(i+signal_chunks)]
    else:
        temp_df = df

    i += signal_chunks

    if i <= signal_length:
        with place_holder.container():
            fig_container = st.container()

            with fig_container:
                st.markdown("### First Chart")
                fig = px.line(data_frame=temp_df, x="Time",
                              y="Value")

                fig.update_xaxes()
                st.write(fig)

            st.markdown("### Detailed Data View")
            st.dataframe(temp_df)
            time.sleep(1)
    else:
        with place_holder.container():
            fig_container = st.container()

            with fig_container:
                st.markdown("### First Chart")
                fig = px.line(data_frame=temp_df, x="Time",
                              y="Value", range_x=[0, 5])

                fig.update_xaxes()
                st.write(fig)

            st.markdown("### Detailed Data View")
            st.dataframe(temp_df)
        break
