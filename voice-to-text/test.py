from openvino.runtime import Core
from transformers import Wav2Vec2Processor
import librosa
import torch
import openvino.runtime as ov

core = Core()
processor = Wav2Vec2Processor.from_pretrained("facebook/hubert-large-ls960-ft")
input_audio, _ = librosa.load("sound.wav", sr=16000)
input_values = processor(input_audio, return_tensors="pt", sampling_rate=16000).input_values

# devices = core.available_devices
# for device in devices:
#     device_name = core.(device_name=device, metric_name="FULL_DEVICE_NAME")
#     print(f"{device}: {device_name}")

#net = ieCore.(model="hubert/hubert.xml", weights="hubert/hubert.bin")
available_devices = core.available_devices
print(available_devices)
compiled_model = core.compile_model("hubert/hubert.xml", "CPU")
infer_request = compiled_model.create_infer_request()

input_tensor = ov.Tensor(array=input_values.numpy(), shared_memory=True)
# Set input tensor for model with one input
infer_request.set_input_tensor(input_tensor)

infer_request.infer()
output = infer_request.get_output_tensor()
output_buffer = output.data
predicted_ids = torch.argmax(torch.Tensor(output_buffer), dim=-1)
transcription = processor.decode(predicted_ids[0]).lower()

print(f"transcription: {transcription}")
