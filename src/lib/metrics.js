import os from "os";
import osu from "os-utils";
import disk from "diskusage";
import speedTest from "speedtest-net";

// Ruta del disco principal (Windows usa 'C:\', Linux y Mac usan '/')
const diskPath = os.platform() === "win32" ? "C:\\" : "/";

export const getServerMetrics = async (req, res) => {
  try {
    // Uso de CPU
    osu.cpuUsage(async (cpuPercent) => {
      // Información del sistema
      const totalMem = os.totalmem() / 1024 / 1024; // Convertir a MB
      const freeMem = os.freemem() / 1024 / 1024;
      const usedMem = totalMem - freeMem;
      const uptime = os.uptime(); // Tiempo en segundos
      const loadAverage = os.loadavg(); // Promedio de carga

      // Velocidad de Internet (Download & Upload)
      const netSpeed = await speedTest({ acceptLicense: true, acceptGdpr: true });

      // Espacio en disco
      const diskInfo = await disk.check(diskPath);
      const freeDisk = diskInfo.free / 1024 / 1024 / 1024; // GB
      const totalDisk = diskInfo.total / 1024 / 1024 / 1024; // GB

      res.json({
        cpuUsage: `${(cpuPercent * 100).toFixed(2)}%`,
        memory: {
          total: `${totalMem.toFixed(2)} MB`,
          used: `${usedMem.toFixed(2)} MB`,
          free: `${freeMem.toFixed(2)} MB`,
        },
        disk: {
          total: `${totalDisk.toFixed(2)} GB`,
          free: `${freeDisk.toFixed(2)} GB`,
        },
        network: {
          download: `${netSpeed.download.bandwidth / 125000} Mbps`,
          upload: `${netSpeed.upload.bandwidth / 125000} Mbps`,
          ping: `${netSpeed.ping.latency} ms`
        },
        uptime: `${(uptime / 60).toFixed(2)} minutes`,
        loadAverage,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics", error });
  }
};
