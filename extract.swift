
import AVFoundation
import AppKit

let asset = AVURLAsset(url: URL(fileURLWithPath: "public/assets/projects/detik-detik-dalam-hidup-menjadi-manusia/preview_clip.mp4"))
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
do {
    let cgImage = try generator.copyCGImage(at: CMTime(seconds: 1.0, preferredTimescale: 600), actualTime: nil)
    let bitmapRep = NSBitmapImageRep(cgImage: cgImage)
    let jpegData = bitmapRep.representation(using: .jpeg, properties: [:])!
    try jpegData.write(to: URL(fileURLWithPath: "public/assets/projects/detik-detik-dalam-hidup-menjadi-manusia/poster.jpg"))
    print("Poster extracted successfully!")
} catch {
    print("Error: \(error)")
}
