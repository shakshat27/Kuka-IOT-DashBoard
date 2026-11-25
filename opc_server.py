import os

from flask import Flask, jsonify
from opcua import Client

app = Flask(__name__)

@app.route("/api/axis-positions")
def axis_positions():
    client = Client(os.getenv("OPCUA_URL", "opc.tcp://localhost:4840"))
    client.set_user(os.getenv("OPCUA_USER", ""))
    client.set_password(os.getenv("OPCUA_PASSWORD", ""))
    try:
        client.connect()
        axis1 = client.get_node("ns=8;s=5001.Robot.Axes.A1.ParameterSet.ActualPosition").get_value()
        axis2 = client.get_node("ns=8;s=5001.Robot.Axes.A2.ParameterSet.ActualPosition").get_value()
        axis3 = client.get_node("ns=8;s=5001.Robot.Axes.A3.ParameterSet.ActualPosition").get_value()
        axis4 = client.get_node("ns=8;s=5001.Robot.Axes.A4.ParameterSet.ActualPosition").get_value()
        axis5 = client.get_node("ns=8;s=5001.Robot.Axes.A5.ParameterSet.ActualPosition").get_value()
        axis6 = client.get_node("ns=8;s=5001.Robot.Axes.A6.ParameterSet.ActualPosition").get_value()
        return jsonify({
            "A1": axis1,
            "A2": axis2,
            "A3": axis3,
            "A4": axis4,
            "A5": axis5,
            "A6": axis6
        })
    except Exception as err:
        return jsonify({"error": str(err)}), 500
    finally:
        try:
            client.disconnect()
        except Exception:
            pass

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5005)
