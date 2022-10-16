# Importing the necessary libraries
import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import plotly_express as px







st.title('Signal Data Studio')

st.sidebar.title("Navigation")
uploaded_file = st.sidebar.file_uploader("Upload your file here")


# options = st.sidebar.radio("Pages", options=[
# "Home",
# "Data Statistics", 
# "Data Header", 
# "Plot",
# "Interactive Plot"
# ])

if uploaded_file is not None:
    
    df = pd.read_csv(uploaded_file)
    st.session_state['df'] = df
    

   

# if options == "Data Statistics":
#    if uploaded_file:
#     stats(df)

# elif options =="Data Header":
#     if uploaded_file:
#      data_header(df)

# elif options =="Plot":
#     if uploaded_file:
#      plot(df)

# elif options =="Interactive Plot":
#     if uploaded_file:
#      interactive_plot(df)

