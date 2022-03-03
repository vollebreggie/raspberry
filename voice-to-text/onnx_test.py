import onnxruntime as rt

sess = rt.InferenceSession(
    "wav2vec2-base-960h.onnx", providers=rt.get_available_providers())


