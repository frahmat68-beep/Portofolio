import AVFoundation
import AppKit

let videoPath = "public/assets/projects/detik-detik-dalam-hidup-menjadi-manusia/preview_clip.mp4"
let url = URL(fileURLWithPath: videoPath)
let asset = AVURLAsset(url: url)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
do {
    let time = CMTime(seconds: 1.0, preferredTimescale: 600)
    let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
    let bitmapRep = NSBitmapImageRep(cgImage: cgImage)
    if let jpegData = bitmapRep.representation(using: .jpeg, properties: [:]) {
        try jpegData.write(to: URL(fileURLWithPath: "public/assets/projects/detik-detik-dalam-hidup-menjadi-manusia/poster.jpg"))
        print("Poster created successfully!")
    }
} catch {
    print("Error:", error)
}
